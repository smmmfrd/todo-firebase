export default function Todo(props){
    const {title, desc, handleDelete} = props

    return(
        <div className="todo">
            <h3>{title}</h3>
            <p>{desc}</p>
            <button onClick={() => handleDelete(title)}>Delete</button>
        </div>
    )
}