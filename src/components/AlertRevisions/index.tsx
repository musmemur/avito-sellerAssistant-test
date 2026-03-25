import {Alert} from "antd";
import {translateParameters} from "../../shared/utils/translateParameters.ts";

export const AlertRevisions = ({ revisions }: { revisions: string[] }) => {
    const title = <>
        <div className='font-semibold'>Требуются доработки</div>
        <div>У объявления не заполнены поля:</div>
        <ul className='list-disc list-inside'>
            {revisions.map((revision, index) =>
                (<li key={index} className='capitalize'>{translateParameters(revision)}</li>)
            )}
        </ul>
    </>;

    return (
        <Alert title={title} type="warning" showIcon
        className="!bg-[var(--bg-llm-color)] !border-none !flex !items-start
        [&_.ant-alert-icon]:!mt-1"/>
    );
};