export default function getPageCount(totalTasks, tasksPerPage) {
    return Math.ceil(totalTasks / tasksPerPage);
}