import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
    const navigate = useNavigate();
    const [serchParams, setSerchParams] = useSearchParams();

    const id = serchParams.get("id");
    console.log("id : ", id);

    const mode = serchParams.get("mode");
    console.log("mode : ", mode);
    return (
        <div>
            <h2>Edit</h2>
            <p>이곳은 일기 수정 페이지입니다.</p>
            <button
                onClick={() => {
                    setSerchParams({ who: "sangwoo" });
                }}
            >
                QS 바꾸기
            </button>

            <button
                onClick={() => {
                    navigate("/home");
                }}
            >
                Home으로 가기
            </button>
            <button
                onClick={() => {
                    navigate(-1);
                }}
            >
                뒤로가기
            </button>
        </div>
    );
};

export default Edit;
