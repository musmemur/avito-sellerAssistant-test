import {useNavigate, useParams} from "react-router-dom";
import {Divider, Form, Input, Select, Spin} from "antd";
import {useEffect, useState} from "react";
import {getItemById} from "../../processes/getItemById.ts";
import type {ItemUpdateIn} from "../../entities";
import {updateItem} from "../../processes/updateItem.ts";
import TextArea from "antd/es/input/TextArea";
import {api} from "../../app/axiosInstance.ts";

const paramsConfig = {
    auto: [
        { name: "brand", label: "Бренд", component: <Input /> },
        { name: "model", label: "Модель", component: <Input /> },
        { name: "yearOfManufacture", label: "Год", component: <Input /> },
        { name: "transmission", label: "Коробка", component: <Select options={[
                { value: "automatic", label: "Автомат" },
                { value: "manual", label: "Механика" }
            ]}/> },
    ],
    real_estate: [
        { name: "type", label: "Тип", component: <Select options={[
                { value: "flat", label: "Квартира" },
                { value: "house", label: "Дом" },
                { value: "room", label: "Комната" }
            ]}/> },
        { name: "address", label: "Адрес", component: <Input /> },
    ],
    electronics: [
        { name: "type", label: "Тип", component: <Select options={[
                { value: "phone", label: "Телефон" },
                { value: "laptop", label: "Ноутбук" },
            ]}/> },
        { name: "brand", label: "Бренд", component: <Input /> },
        { name: "model", label: "Модель", component: <Input /> },
        { name: "condition", label: "Состояние", component: <Select options={[
                { value: "new", label: "Новый" },
                { value: "used", label: "Б/у" }
            ]}/> },
    ]
};

export const EditAdvertPage = () => {
    const { id } = useParams<{ id: string }>();
    const [advert, setAdvert] = useState<ItemUpdateIn | null>(null);
    const [improving, setImproving] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        const paramFields = paramsConfig[advert.category].map(f => f.name);

        const params = {};
        paramFields.forEach(field => {
            params[field] = values[field];
            delete values[field];
        });

        const result = {
            ...values,
            params
        };

        updateItem(id, result).then(() => {
            console.log("updated");
            navigate('./..')
        });
    };

    useEffect(() => {
        if (id) {
            getItemById(id).then(data => {
                setAdvert(data);

                form.setFieldsValue({
                    ...data,
                    ...data.params
                });
            });
        }
    }, [id]);

    const handleImprove = async () => {
        try {
            setImproving(true);

            const values = form.getFieldsValue();

            const text = await improveDescription({
                ...values,
                params: extractParams(values)
            });

            form.setFieldValue('description', text);
        } catch (e) {
            console.error(e);
        } finally {
            setImproving(false);
        }
    };

    const extractParams = (values) => {
        const paramFields = paramsConfig[advert.category].map(f => f.name);

        const params = {};
        paramFields.forEach(field => {
            params[field] = values[field];
        });

        return params;
    };

    const improveDescription = async (data) => {
        const res = await api.post('/llm/improve-description', data);
        return res.data.text;
    };

    const categories = [{label: 'Электроника', value: 'electronics'},
        {label: 'Недвижимость', value: 'real_estate'}, {label: 'Авто', value: 'auto'}];

    if (!advert) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className='!m-8 flex flex-col gap-[18px]'>
            <h1>Реадактирование объявления</h1>
            <Form form={form} onFinish={onFinish}>
                <Form.Item style={{maxWidth: 456}} layout='vertical' label='Категория' name='category'
                           rules={[{required: true}]}>
                    <Select value={advert.category} options={categories}/>
                </Form.Item>
                <Divider/>
                <Form.Item style={{maxWidth: 456}} layout='vertical' label='Название' name='title'
                           rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Divider/>
                <Form.Item style={{maxWidth: 675}}
                           className='[&_.ant-form-item-control-input-content]:flex [&_.ant-form-item-control-input-content]:gap-6'
                           layout='vertical' label='Цена' name='price'
                           rules={[{required: true}]}>
                    <Input style={{width: 456}}/>
                    <button className='flex-nowrap bg-[var(--bg-llm-color)]
                    text-[var(--bg-llm-text)] !py-[5px] !px-[10px] rounded-[8px]'>
                        Узнать рыночную цену
                    </button>
                </Form.Item>
                <Divider/>
                <div>Характеристики</div>
                {paramsConfig[advert.category].map(field => (
                    <Form.Item
                        style={{maxWidth: 456}}
                        layout='vertical'
                        key={field.name}
                        label={field.label}
                        name={field.name}
                    >
                        {field.component}
                    </Form.Item>
                ))}
                <Divider/>
                <div className='max-w-[946px]'>
                    <Spin spinning={improving}>
                        <Form.Item
                            style={{maxWidth: 942}}
                            layout='vertical'
                            label='Описание'
                            name='description'
                        >
                            <TextArea
                                maxLength={1000}
                                showCount
                                autoSize={{minRows: 4, maxRows: 8}}
                            />
                        </Form.Item>
                    </Spin>

                    <button
                        type="button"
                        onClick={handleImprove}
                        disabled={improving}
                        className='flex-nowrap bg-[var(--bg-llm-color)] text-[var(--bg-llm-text)] !py-[5px] !px-[10px] rounded-[8px] disabled:opacity-50'
                    >
                        {improving ? 'Генерация...' : 'Улучшить описание'}
                    </button>
                </div>
                <div className='flex gap-[10px] [&_button]:!p-2 !mt-8 [&_button]:rounded-[8px] '>
                    <button type="submit" className='bg-[var(--btn-save-color)] text-white'>Сохранить</button>
                    <button onClick={() => navigate('./..')} className='bg-[var(--border-color)]'>Отменить</button>
                </div>
            </Form>
        </div>
    );
};