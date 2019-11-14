export default function getState(data) {
    if( !!data.solved ) {
        return {
            type: 'gray',
            text: '已解决'
        }
    }else if( !!data.solution_num ) {
        return {
            type: 'warning',
            text: '已提交'
        }
    }
    return {
        type: 'primary',
        text: '待解决'
    }
}