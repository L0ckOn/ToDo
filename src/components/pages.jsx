import React, {useState, useMemo, useEffect} from 'react';


export default function Pages({tasksPerPage, totalTasks, paginate, curPage}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div class="page_number_container">
            <button 
                class="btn page_number"
                onClick={() => paginate((curPage - 1) ? 
                                        curPage - 1 : 
                                        1)}
                >{'<<'}</button>
            {pageNumbers.map(number => (
                <button 
                    className="btn page_number"
                    onClick={() => paginate(number)}>{number}</button>
                )
            )}
            <button 
            class="btn page_number"
            onClick={() => paginate((curPage + 1 > pageNumbers.length) ? 
                                    curPage : 
                                    curPage + 1)}
            >{'>>'}</button>
        </div>

    )
}
