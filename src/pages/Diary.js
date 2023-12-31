import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

import { emotionList } from "../utill/emotion";
import { getStringDate, getDayOfWeek } from "../utill/date";

import MyHeader from "../component/MyHeader";
import MyButton from "../component/MyButton";

const Diary = () => {
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
    }, []);

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

            if (targetDiary) {
                // 일기 존재
                setData(targetDiary);
            } else {
                // 일기 존재 x
                alert("없는 일기입니다.");
                navigate("/", { replace: true });
            }
        }
    }, [id, diaryList]);

    if (!data) {
        return <div className="DiaryPage">로딩중입니다...</div>;
    } else {
        const curEmotionData = emotionList.find(
            (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
        );
        const dayOfWeek = getDayOfWeek(new Date(data.date));

        return (
            <div className="DiaryPage">
                <MyHeader
                    headText={`${getStringDate(new Date(data.date))} (${dayOfWeek}) 기록`}
                    leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
                    rightChild={
                        <MyButton text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)} />
                    }
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div
                            className={[
                                "diary_img_wrapper",
                                `diary_img_wrapper_${data.emotion}`,
                                ,
                            ].join(" ")}
                        >
                            <img src={curEmotionData.emotion_img} />
                            <div className="emotion_descript">
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Diary;
