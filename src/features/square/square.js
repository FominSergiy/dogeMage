
export const Square = (props) => {
    const squareObj = props.squareObj;

    const mage = squareObj.mage
        ? <img src={squareObj.mage} style={{ width: "100%", height: "100%" }} />
        : null;

    const coin = squareObj.coin
        ? <img src={squareObj.coin} style={{ width: "50%", height: "50%" }} />
        : null;

    return (
        <div className='square' id={props.id} >
            {mage || coin}
        </div>
    );
};
