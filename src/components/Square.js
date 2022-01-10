import { getImage } from "../utils/squareUtils";

const Square = (props) => {
    const squareObj = props.squareObj;

    const mage = getImage("mage", squareObj.mage);
    const coin = getImage("coin", squareObj.coin);

    return (
        <div className='square' id={props.id} >
            {mage || coin}
        </div>
    );
};

export default Square;