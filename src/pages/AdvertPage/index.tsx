import {Link, useParams} from "react-router-dom";
import {Divider} from "../../shared/svg/Divider.tsx";
import {Alert} from "antd";
import {useEffect, useState} from "react";
import {getItemById} from "../../processes/getItemById.ts";

export const AdvertPage = () => {
    const { id } = useParams<{ id: string }>();
    const [advert, setAdvert] = useState();

    useEffect(() => {
        getItemById(id).then(data => {
            setAdvert(data.items);
        });
    }, [id])

    return (
        <div className='!p-8 !bg-[var(--bg-components)] min-h-[100vh] flex flex-col gap-8'>
            <div className="flex flex-col gap-3">
                <div className='flex justify-between'>
                    <span>MacBook Pro 16”</span>
                    <span>64000 ₽</span>
                </div>
                <div className='flex justify-between'>
                    <Link to='./edit'>Редактировать</Link>
                    <div className="flex flex-col">
                        <span>Опубликовано: 10 марта 22:39</span>
                        <span>Отредактировано: 10 марта 23:12</span>
                    </div>
                </div>
            </div>
            <Divider />
            <div className='flex gap-8'>
                <img className='w-[480px]' src='/src/shared/img/cover.jpg' alt='Image placeholder' />
                <div className='flex flex-col gap-9 w-[512px]'>
                    <Alert title="Требуются доработки" type="warning" showIcon />
                    <div className='flex gap-4 flex-col'>
                        <span>Характеристики</span>
                        <div className='flex flex-col gap-6px] [&_>div]:flex [&_>div]:justify-between'>
                            <div>
                                <span>Тип</span>
                                <span>Ноутбук</span>
                            </div>
                            <div>
                                <span>Бренд</span>
                                <span>Apple</span>
                            </div>
                            <div>
                                <span>Модель</span>
                                <span>M1 Pro</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <p className='flex flex-col gap-4 w-[480px]'>
                <span>Описание</span>
                <span>Продаю свой MacBook Pro 16" (2021) на чипе M1 Pro. Состояние отличное, работал бережно.
                    Мощности хватает на всё: от сложного монтажа до кода, при этом ноутбук почти не греется.
                </span>
            </p>
        </div>
    );
};