import React, { useState, useMemo, useEffect } from "react";

export default function Pages(props) {
    console.log(1)
    const pageNumbers = [];
    for (let i = 1; i <= props.pageCount; i++) {
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
