import React from "react";

export default function Pages(props) {
    const pageNumbers = [];
    const pageCount = Math.ceil(props.tasksCount / 5);

    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }
    return (
      <div className="page_number_container">
        <button
          className="btn page_number"
          onClick={() =>
            props.paginate(props.curPage - 1 > 0 ? props.curPage - 1 : 1)
          }
          id="<<"
          disabled={props.curPage === 1}
        >
          {"<<"}
        </button>
        {pageNumbers.map((number) => (
          <button
            className="btn page_number"
            disabled={props.curPage === number}
            onClick={() => props.paginate(number)}
            id={number}
          >
            {number}
          </button>
        ))}
        <button
          className="btn page_number"
          onClick={() =>
            props.paginate(
              props.curPage + 1 > pageNumbers.length
                ? props.curPage
                : props.curPage + 1
            )
          }
          id=">>"
          disabled={pageNumbers.length === 0 || props.curPage === pageNumbers.length}
        >
          {">>"}
        </button>
      </div>
    );
}
