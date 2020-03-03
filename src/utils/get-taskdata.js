import timestampToDate from './timestamp-to-date';

export default function getTaskData(data) {
    //let time = data.txtime && data.txtime.substring(0, data.txtime.length - 10);
    //let context = JSON.parse(data.context);
    let time = timestampToDate(data.create_time);
    let reward = data.reward && data.reward / 1000000000000000000;
    let type, text;
    // if( !!data.solved ) {
    //     type = 'gray';
    //     text = '已解决';
    // }else if( !!data.solution_num ) {
    //     type = 'warning';
    //     text = '已提交';
    // }
    if( data.task_state == 'success' ) {
        type = 'gray';
        text = '已解决';
    }else if( data.task_state == 'published' ) {
        type = 'primary';
        text = '待解决';
    }else {
        type = 'warning';
        text = '已提交';
    }

    return {
        ...data,
        // title: context.title,
        // desc: context.desc,
        //skills: data.skills,
        time,
        type,
        text,
        reward
    }
}