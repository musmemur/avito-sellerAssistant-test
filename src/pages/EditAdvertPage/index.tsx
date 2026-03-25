import {useNavigate, useParams} from "react-router-dom";
import {Divider, Form, Input, Select, Spin, Tooltip} from "antd";
import { BulbOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import {getItemById} from "../../processes/getItemById.ts";
import type {ItemUpdateIn} from "../../entities";
import {updateItem} from "../../processes/updateItem.ts";
import TextArea from "antd/es/input/TextArea";
import {improveDescription} from "../../processes/improveDescription.ts";
import {estimatePrice} from "../../processes/estimatePrice.ts";

const paramsConfig = {
    auto: [
        { name: "brand", label: "Бренд", component: <Input allowClear /> },
        { name: "model", label: "Модель", component: <Input allowClear /> },
        { name: "yearOfManufacture", label: "Год", component: <Input allowClear /> },
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
        { name: "address", label: "Адрес", component: <Input allowClear /> },
    ],
    electronics: [
        { name: "type", label: "Тип", component: <Select options={[
                { value: "phone", label: "Телефон" },
                { value: "laptop", label: "Ноутбук" },
            ]}/> },
        { name: "brand", label: "Бренд", component: <Input allowClear /> },
        { name: "model", label: "Модель", component: <Input allowClear /> },
        { name: "condition", label: "Состояние", component: <Select options={[
                { value: "new", label: "Новый" },
                { value: "used", label: "Б/у" }
            ]}/> },
        { name: "color", label: "Цвет", component: <Input allowClear /> },
    ]
};

const DRAFT_KEY = 'advert_draft_';

export const EditAdvertPage = () => {
    const { id } = useParams<{ id: string }>();
    const [advert, setAdvert] = useState<ItemUpdateIn | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [aiPrice, setAiPrice] = useState<string | null>(null);
    const [improving, setImproving] = useState(false);
    const [priceImproving, setPriceImproving] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const saveDraft = (values: any) => {
        if (!id) return;
        const draft = {
            ...values,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem(`${DRAFT_KEY}${id}`, JSON.stringify(draft));
    };

    const loadDraft = (): any | null => {
        if (!id) return null;
        const draftStr = localStorage.getItem(`${DRAFT_KEY}${id}`);
        if (draftStr) {
            try {
                return JSON.parse(draftStr);
            } catch {
                return null;
            }
        }
        return null;
    };

    const clearDraft = () => {
        if (!id) return;
        localStorage.removeItem(`${DRAFT_KEY}${id}`);
    };

    const handleValuesChange = (changedValues: any, allValues: any) => {
        saveDraft(allValues);
    };

    const onFinish = async (values) => {
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

        try {
            await updateItem(id, result);
            clearDraft(); // Удаляем черновик после успешного сохранения
            console.log("updated");
            navigate('./..');
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                if (!id) {
                    setAdvert(null);
                    return;
                }

                const data = await getItemById(id);
                if (!data) {
                    setAdvert(null);
                    return;
                }

                setAdvert(data);

                const draft = loadDraft();
                const hasDraft = draft && draft.savedAt;

                if (hasDraft) {
                    const { ...draftData } = draft;
                    form.setFieldsValue({
                        ...data,
                        ...data.params,
                        ...draftData
                    });
                    return;
                }

                form.setFieldsValue({
                    ...data,
                    ...data.params
                });

            } catch {
                setAdvert(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleImprove = async () => {
        setImproving(true);
        try {
            const values = form.getFieldsValue();

            const text = await improveDescription({
                ...values,
                params: extractParams(values)
            });

            form.setFieldValue('description', text);
            saveDraft(form.getFieldsValue());
        } catch (e) {
            console.error(e);
        } finally {
            setImproving(false);
        }
    };

    const handlePrice = async () => {
        setPriceImproving(true);
        try {
            const values = form.getFieldsValue();

            const price = await estimatePrice({
                ...values,
                params: extractParams(values)
            });

            setAiPrice(price);
        } finally {
            setPriceImproving(false);
        }
    };

    const extractParams = (values) => {
        if (!advert) return {};
        const paramFields = paramsConfig[advert.category].map(f => f.name);

        const params = {};
        paramFields.forEach(field => {
            params[field] = values[field];
        });

        return params;
    };

    const categories = [{label: 'Электроника', value: 'electronics'},
        {label: 'Недвижимость', value: 'real_estate'}, {label: 'Авто', value: 'auto'}];

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!advert) {
        return <div>Ошибка: объявление не найдено</div>;
    }

    return (
        <div className='!m-8 flex flex-col gap-[18px]'>
            <h1 className='font-medium text-[30px] opacity-85'>Редактирование объявления</h1>
            <Form
                form={form}
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
            >
                <Form.Item style={{maxWidth: 456, margin: 0}}
                           layout='vertical'
                           label={<span className='font-semibold'>Категория</span>}
                           name='category'
                           rules={[{required: true}]}>
                    <Select options={categories}/>
                </Form.Item>
                <Divider className='!m-[18px_0]'/>
                <Form.Item style={{maxWidth: 456, margin: 0}}
                           layout='vertical'
                           label={<span className='font-semibold'>Название</span>}
                           name='title'
                           rules={[{required: true, message: 'Введите название объявления'}]}>
                    <Input allowClear/>
                </Form.Item>
                <Divider className='!m-[18px_0]'/>
                <div className='flex gap-6 items-end'>
                    <Spin spinning={priceImproving}>
                        <Form.Item style={{maxWidth: 675, margin: 0}}
                                   className='[&_.ant-form-item-control-input-content]:flex [&_.ant-form-item-control-input-content]:gap-6'
                                   layout='vertical'
                                   label={<span className='font-semibold'>Цена</span>}
                                   name='price'
                                   rules={[{required: true, message: 'Введите цену объявления'}]}>
                            <Input style={{width: 456}} allowClear/>
                        </Form.Item>
                    </Spin>
                    <Tooltip
                        title={aiPrice ? (
                            <div className="flex flex-col gap-2">
                                <span>Ответ AI:</span>
                                <div>{aiPrice} ₽</div>
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        form.setFieldValue('price', parseInt(aiPrice));
                                        saveDraft(form.getFieldsValue());
                                    }}
                                >
                                    Применить
                                </button>
                            </div>
                        ) : 'Нажмите, чтобы узнать цену'}
                    >
                        <button
                            type='button'
                            onClick={handlePrice}
                            disabled={priceImproving}
                            className='flex gap-[10px] bg-[var(--bg-llm-color)] h-[32px]
                            text-[var(--bg-llm-text)] !py-[5px] !px-[10px] rounded-[8px]'
                        >
                            <BulbOutlined />
                            <span>{priceImproving ? 'Генерация...' : 'Узнать рыночную цену'}</span>
                        </button>
                    </Tooltip>
                </div>
                <Divider className='!m-[18px_0]'/>
                <div className='font-semibold !mb-2'>Характеристики</div>
                {paramsConfig[advert.category].map(field => (
                    <Form.Item
                        style={{maxWidth: 456, marginBottom: 16}}
                        layout='vertical'
                        key={field.name}
                        label={field.label}
                        name={field.name}
                    >
                        {field.component}
                    </Form.Item>
                ))}
                <Divider className='!m-[18px_0]'/>
                <div className='max-w-[946px]'>
                    <Spin spinning={improving}>
                        <Form.Item
                            style={{maxWidth: 942, marginBottom: 8}}
                            layout='vertical'
                            label={<span className='font-semibold'>Описание</span>}
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
                        className='flex gap-[10px] bg-[var(--bg-llm-color)] text-[var(--bg-llm-text)] !py-[5px] !px-[10px] rounded-[8px]'
                    >
                        <BulbOutlined />
                        <span>{improving ? 'Генерация...' : 'Улучшить описание'}</span>
                    </button>
                </div>
                <div className='flex gap-[10px] [&_button]:!p-2 !mt-8 [&_button]:rounded-[8px] '>
                    <button type="submit" className='bg-[var(--btn-active-color)] text-white'>Сохранить</button>
                    <button onClick={() => navigate('./..')} className='bg-[var(--border-color)]'>Отменить</button>
                </div>
            </Form>
        </div>
    );
};