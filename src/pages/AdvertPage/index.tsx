import {Link, useParams} from "react-router-dom";
import {Divider} from "../../shared/svg/Divider.tsx";
import {Alert} from "antd";
import {useEffect, useState} from "react";
import {getItemById} from "../../processes/getItemById.ts";
import type {ItemUpdateIn} from "../../entities";

export const AdvertPage = () => {
    const { id } = useParams<{ id: string }>();
    const [advert, setAdvert] = useState<ItemUpdateIn | null>(null);
    const [revisions, setRevisions] = useState([]);

    const checkRevision = (obj) => {
        const missing = [];

        const walk = (o, path = '') => {
            for (const key in o) {
                const currentPath = path ? `${path}.${key}` : key;

                if (typeof o[key] === 'object' && o[key] !== null) {
                    walk(o[key], currentPath);
                } else {
                    if (o[key] === undefined || o[key] === '') {
                        missing.push(currentPath);
                    }
                }
            }
        };

        walk(obj);
        setRevisions(missing);
    };

    useEffect(() => {
        if (id) {
            getItemById(id).then(data => {
                setAdvert(data);

                if (data.needsRevision) {
                    checkRevision(data);
                }
            });
        }
    }, [id]);

    if (!advert) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className='!p-8 !bg-[var(--bg-components)] min-h-[100vh] flex flex-col gap-8'>
            <div className="flex flex-col gap-3">
                <div className='flex justify-between'>
                    <span>{advert.title}</span>
                    <span>{advert.price} ₽</span>
                </div>
                <div className='flex justify-between'>
                    <Link to='./edit'>Редактировать</Link>
                    <div className="flex flex-col">
                        <span>Опубликовано: {advert.createdAt}</span>
                        <span>Отредактировано: 10 марта 23:12</span>
                    </div>
                </div>
            </div>
            <Divider />
            <div className='flex gap-8'>
                <img className='w-[480px]' src='/src/shared/img/cover.jpg' alt='Image placeholder' />
                <div className='flex flex-col gap-9 w-[512px]'>
                    {revisions.length > 0 &&
                        <Alert title={<>
                            <div>Требуются доработки</div>
                            <div>У объявления не заполнены поля:</div>
                            <ul>
                                {revisions.map((revision, index) => (<li key={index}>{revision}</li>))}
                            </ul>
                        </>} type="warning" showIcon/>
                    }
                    <div className='flex gap-4 flex-col'>
                        <span>Характеристики</span>
                        <div className='flex flex-col gap-[6px] [&_>div]:flex [&_>div]:justify-between'>
                            {Object.entries(advert.params).map(([key, value]) => (
                                <div key={key}>
                                    <span>{key}</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <p className='flex flex-col gap-4 w-[480px]'>
                <span>Описание</span>
                <span>{advert.description}</span>
            </p>
        </div>
    );
};