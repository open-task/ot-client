export default function getState(key = 'task', state = 'published') {
    let _statetext = {
        'task': {
            'success': '已解决',
            'published': '待解决',
            'waiting_chain': '待解决',
            'updated': '已提交'
        },
        'question': {
            'success': '已解决',
            'published': '待回答',
            'waiting_chain': '待回答',
            'updated': '已回答'
        }
    }
    let _statetype = {
        'success': 'gray',
        'published': 'primary',
        'waiting_chain': 'primary',
        'updated': 'warning'
    }

    return {
        type: 't-' + _statetype[state],
        text: _statetext[key][state]
    }
}