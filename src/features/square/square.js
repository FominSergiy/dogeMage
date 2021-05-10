
export const Square = (props) => {
    const squareObj = props.squareObj;
    
    const mageImg = squareObj.mage
        ? <img src={squareObj.mage} style={{ width: "100%", height: "100%" }} />
        : null;

    return (
        <div className='square' id={props.id} >
            {mageImg}
        </div>
    );
};
