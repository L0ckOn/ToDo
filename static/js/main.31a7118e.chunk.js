(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{321:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(46),l=n.n(c),s=n(16),o=n(6);n(56);function u(e){return r.a.createElement("div",{className:"task",key:e.task.id},r.a.createElement("div",{className:"left_side"},r.a.createElement("input",{type:"checkbox",defaultChecked:e.task.isDone,onClick:function(){e.task.isDone=!e.task.isDone}}),r.a.createElement("p",null,e.task.name)),r.a.createElement("div",{className:"right_side"},r.a.createElement("span",null,new Date(e.task.id).toLocaleDateString()),r.a.createElement("input",{type:"button",className:"trashcan",onClick:function(){return e.remove(e.task)}})))}function i(e){var t=e.tasks,n=e.remove;return r.a.createElement("div",{className:"tasks_list"},t.map(function(e){return r.a.createElement(u,{remove:n,task:e,key:e.id})}))}function m(e){for(var t=e.tasksPerPage,n=e.totalTasks,a=e.paginate,c=e.curPage,l=[],s=1;s<=Math.ceil(n/t);s++)l.push(s);return r.a.createElement("div",{class:"page_number_container"},r.a.createElement("button",{class:"btn page_number",onClick:function(){return a(c-1?c-1:1)}},"<<"),l.map(function(e){return r.a.createElement("button",{className:"btn page_number",onClick:function(){return a(e)}},e)}),r.a.createElement("button",{class:"btn page_number",onClick:function(){return a(c+1>l.length?c:c+1)}},">>"))}var d=function(e){e.target;var t=Object(a.useState)([]),n=Object(o.a)(t,2),c=n[0],l=n[1],u=(Object(a.useRef)([]),Object(a.useState)("")),d=Object(o.a)(u,2),b=d[0],f=d[1],k=function(e){var t=e.target;"\u2191"===t.lastChild.data&&l(Object(s.a)(c).sort(function(e,t){return e.id-t.id})),"\u2193"===t.lastChild.data&&l(Object(s.a)(c).sort(function(e,t){return t.id-e.id}))},E=Object(a.useState)("all"),p=Object(o.a)(E,2),v=p[0],g=p[1],h=Object(a.useMemo)(function(){switch(v){case"all":return c;case"done":return c.filter(function(e){return e.isDone});case"undone":return c.filter(function(e){return!e.isDone})}},[c,v]),C=Object(a.useState)(1),_=Object(o.a)(C,2),j=_[0],N=_[1],O=5*j,w=O-5,D=h.slice(w,O);return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"ToDo"),r.a.createElement("input",{className:"add_task",type:"text",placeholder:"\u0447\u0442\u043e \u0431\u044b \u044f \u0445\u043e\u0442\u0435\u043b \u0441\u0434\u0435\u043b\u0430\u0442\u044c...",value:b,onChange:function(e){return f(e.value)},onKeyDown:function(e){if("Enter"===e.key&&e.target.value){var t={id:Date.now(),name:e.target.value,isDone:!1};l([t].concat(Object(s.a)(c))),f("")}}}),r.a.createElement("div",{className:"header_buttons"},r.a.createElement("div",null,r.a.createElement("button",{className:"btn",onClick:function(){return g("all")}},"All"),r.a.createElement("button",{className:"btn",onClick:function(){return g("done")}},"Done"),r.a.createElement("button",{className:"btn",onClick:function(){return g("undone")}},"Undone")),r.a.createElement("div",{className:"flex_date_sort"},r.a.createElement("span",null,"Sort by date"),r.a.createElement("button",{class:"btn arrow_btn",onClick:k},"\u2191"),r.a.createElement("button",{class:"btn arrow_btn",onClick:k},"\u2193"))),r.a.createElement(i,{remove:function(e){l(c.filter(function(t){return t.id!==e.id}))},tasks:D}),r.a.createElement(m,{totalTasks:h.length,tasksPerPage:5,paginate:function(e){return N(e)},curPage:j}))};l.a.createRoot(document.getElementById("root")).render(r.a.createElement(d,null))},47:function(e,t,n){e.exports=n(321)}},[[47,2,1]]]);
//# sourceMappingURL=main.31a7118e.chunk.js.map