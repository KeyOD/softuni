export default function Todo({ id, text, isCompleted, changeStatus }) {    
    return (
        <>
            <tr className={`todo${isCompleted ? ' is-completed' : ''}`}>
                <td>{text}</td>
                <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
                <td className="todo-action">
                    <button onClick={()=>changeStatus(id)} className="btn todo-btn">Change status</button>
                </td>
            </tr>
        </>
    );
}
