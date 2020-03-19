import timestampToDate from './timestamp-to-date';
import getState from './get-state';
export default function getTaskData(data) {
    //let time = data.txtime && data.txtime.substring(0, data.txtime.length - 10);
    //let context = JSON.parse(data.context);
    let time = timestampToDate(data.create_time);
    let reward = data.reward && data.reward / 1000000000000000000;
    return {
        ...data,
        // title: context.title,
        // desc: context.desc,
        //skills: data.skills,
        ...getState('task', data.task_state),
        time,
        reward
    }
}