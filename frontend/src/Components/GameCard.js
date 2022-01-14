import "../CSS/Assets/assets.css";
import "../CSS/Components/gameCard.css";
import {useNavigate} from 'react-router-dom';
export default function GameCard(props){
    const navigate = useNavigate()
    return(<div className="game--card--container" onClick={()=>navigate(props.to)}>
        <div className="tag">{props.name}</div>
    </div>)
}