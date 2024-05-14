import axios from "axios";
import BoardContentView from "../view/BoardContentView";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

function BoardContentViewProtectedRouter() {

    const { boardIdx } = useParams()
    const [isVaild, setIsVaild] = useState(false);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        const validateReadPermission = async () => {
            try {
                const res = await axios.post("http://localhost:1000/api/security/validateReadPermissionToken", {
                    ticket: window.sessionStorage.getItem("r_permission"),
                    boardIdx: boardIdx
                });

                setIsVaild(res.data.message === "TOKEN_GOOD")
            } catch (error) {
                setIsVaild(false);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        validateReadPermission();
    }, []);

    if(isLoading) {
        return ( 
            <p></p>
        )
    }


    if (isVaild) {
        return (
            <BoardContentView boardIdx={boardIdx} />
        );
    }

    if(!isVaild) {
        return (
            <Navigate replace to="/" />
        );  
    }



}

export default BoardContentViewProtectedRouter;
