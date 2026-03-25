import {Link, useParams} from "react-router-dom";
import { EditOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import {getItemById} from "../../processes/getItemById.ts";
import type {ItemUpdateIn} from "../../entities";
import {AlertRevisions} from "../../components/AlertRevisions";
import {translateParameters} from "../../shared/utils/translateParameters.ts";
import {formatDate} from "../../shared/utils/formatDate.ts";
import {Divider} from "antd";

export const AdvertPage = () => {
    const { id } = useParams<{ id: string }>();
    const [advert, setAdvert] = useState<ItemUpdateIn | null>(null);
    const [revisions, setRevisions] = useState<string[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const checkRevision = (obj: ItemUpdateIn) => {
        const missing: string[] = [];

        const walk = (o: Record<string, unknown>, path = '') => {
            for (const key in o) {
                const currentPath = path ? `${path}.${key}` : key;
                const value = o[key];

                if (typeof value === 'object' && value !== null) {
                    walk(value as Record<string, unknown>, currentPath);
                } else {
                    if (value === null || value === '') {
                        const lastProperty = currentPath.split('.').pop();
                        missing.push(lastProperty!);
                    }
                }
            }
        };

        walk(obj);
        setRevisions(missing);
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
                if (data.needsRevision) {
                    checkRevision(data);
                }
            } catch {
                setAdvert(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!advert) {
        return <div>Ошибка: объявление не найдено</div>;
    }

    return (
        <div className='!p-8 !bg-[var(--bg-components)] min-h-[100vh] flex flex-col gap-8'>
            <div className="flex flex-col gap-3">
                <div className='flex justify-between'>
                    <span className='font-semibold opacity-85 text-[30px]'>{advert.title}</span>
                    <span className='font-semibold opacity-85 text-[30px]'>{advert.price} ₽</span>
                </div>
                <div className='flex justify-between'>
                    <Link to='./edit'
                          className='flex gap-2 items-center h-[38px] bg-[var(--btn-active-color)]
                          text-[var(--text-neutral)] rounded-[8px] !py-2 !px-3'>
                        <span>Редактировать</span>
                        <EditOutlined />
                    </Link>
                    <div className="flex flex-col text-[var(--text-muted)]">
                        <span>Опубликовано: {formatDate(advert.createdAt)}</span>
                    </div>
                </div>
            </div>
            <Divider className='!m-0' />
            <div className='flex gap-8'>
                <img className='w-[480px]' src='/src/shared/img/cover.jpg' alt='Image placeholder' />
                <div className='flex flex-col gap-9 w-[512px]'>
                    {revisions.length > 0 &&
                        <AlertRevisions revisions={revisions} />
                    }
                    <div className='flex gap-4 flex-col'>
                        <span className='text-[22px] font-medium'>Характеристики</span>
                        <div className='flex flex-col [&_>div]:flex [&_>div]:justify-between'>
                            {Object.entries(advert.params).map(([key, value]) => (
                                <div key={key}>
                                    <span className='opacity-45 font-semibold capitalize'>
                                        {translateParameters(key)}
                                    </span>
                                    <span className='capitalize'>
                                        {value ? translateParameters(String(value)) :
                                            <span className='opacity-45 italic lowercase'>не указано</span>}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <p className='flex flex-col gap-3 w-[480px]'>
                <span className='text-[22px] font-medium'>Описание</span>
                <span>{advert.description || <span className='opacity-45 italic'>пока нет описания</span>}</span>
            </p>
        </div>
    );
};