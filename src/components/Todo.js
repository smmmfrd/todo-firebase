export default function Todo(props){
    const {title, desc} = props

    return(
        <div className="todo">
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    )
}