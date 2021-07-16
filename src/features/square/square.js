
export const Square = (props) => {
    const squareObj = props.squareObj;

    const mage = getImage("mage", squareObj.mage);
    const coin = getImage("coin", squareObj.coin);

    return (
        <div className='square' id={props.id} >
            {mage || coin}
        </div>
    );
};

const getImage = (whichImage, image) => {
    switch (whichImage) {
        case "mage":
            const mage = image
                ? <img src={image} 
                       style={{ width: "100%", height: "100%" }}
                       alt='mage' />
                : null;
            return mage;
        case "coin":
            const coin = image
                ? <img src={image} 
                       style={{ width: "50%", height: "50%" }}
                       alt='coin' />
                : null;
            return coin;
        default:
            return null;
    }
}