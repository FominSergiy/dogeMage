import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../scoreBoard/scoreBoardActions.js";
import { handleSubmit } from "./nameFormUtils.js";
import "./nameForm.css";

const NameForm = (props) => {
    const dispatch = useDispatch();
    const userName = useSelector(store => store.userName);

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            const isSubmit = event.keyCode === 13
                ? true
                : false;

            if (isSubmit) {
                handleSubmit(
                    event,
                    userName,
                    props.whichIndex,
                    props.itemAtIndex,
                    props.score,
                    dispatch
                );
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            // cleanup this component
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch, props, userName]);

    return (
        <div className={`winner-${props.screenSize}`}>
            <div className='congrats'>
                <h1>Congrats on setting a new Record!</h1>
            </div>
            <form onSubmit={
                event => handleSubmit(
                    event,
                    userName,
                    props.whichIndex,
                    props.itemAtIndex,
                    props.score,
                    dispatch
                )}>
                <label>
                    How should we write you down in History?
                    <br></br>
                    <input
                        type='text'
                        onChange={event => dispatch(
                            setUserName(event.target.value)
                        )}
                    />
                </label>
                <br></br>
                <button className='submit' type='Submit'>
                    submit
                </button>
            </form>
        </div>
    );
};

NameForm.propTypes = {
    whichIndex : PropTypes.number,
    itemAtIndex : PropTypes.any,
    score : PropTypes.number,
    screenSize: PropTypes.string
};

export default NameForm;