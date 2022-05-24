import React, {useState, useEffect} from 'react';


export default function Pages(props) {
    const pageNumbers = [];
    const totalPages = Math.ceil(props.totalTasks / props.tasksPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <div class="page_number_container">
            <button 
                class="btn page_number"
                onClick={() => props.paginate((props.curPage - 1) ? 
                                        props.curPage - 1 : 
                                        1)}
                id='<<'
                disabled={props.curPage === 1 ? true : false}
                >{'<<'}</button>
            {pageNumbers.map(number => (
                <button 
                    className="btn page_number"
                    disabled={props.curPage === number ? true : false}
                    onClick={() => props.paginate(number)} id={number}>{number}</button>
                )
            )}
            <button 
            class="btn page_number"
            onClick={() => props.paginate((props.curPage + 1 > pageNumbers.length) ? 
                                    props.curPage : 
                                    props.curPage + 1)}
            id='>>'
            disabled={(pageNumbers.length === 0 || props.curPage === pageNumbers.length) ? true : false}
            >{'>>'}</button>
        </div>

    )
}
