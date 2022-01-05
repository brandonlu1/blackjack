import '../CSS/Components/card.css';
export default function Card(props){
    return(<img className="card--container" src={props.image} alt={props.value} draggable="false"/>)
}