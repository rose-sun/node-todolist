var fs = require('fs')  //fs全称是 file system 文件系统
const verb = process.argv[2]
const content = process.argv[3]
const content2 = process.argv[4]

if (verb == 'add') {
    // 添加任务
    fs.stat('F:\\XUEXI-demo\\todolist-demo\\db', function(err, stat) {
        if(err == null) {
            // 文件存在
            // 先读取已有数据，再转为数组存入list
            const fileContent = fs.readFileSync('F:\\XUEXI-demo\\todolist-demo\\db').toString();
            const list = JSON.parse(fileContent);  // 反序列化

            const task = content  // 获取任务
            list.push([task, false])  // 存入任务到list中
            fs.writeFileSync('F:\\XUEXI-demo\\todolist-demo\\db', JSON.stringify(list))  // 序列化后存到数据库
            console.log(list) // 列出所有任务
        } else if(err.code === 'ENOENT') {
            // 文件不存在
            fs.writeFileSync('F:\\XUEXI-demo\\todolist-demo\\db', '');
            const list = []

            const task = content  // 获取任务
            list.push([task, false])
            fs.writeFileSync('F:\\XUEXI-demo\\todolist-demo\\db', JSON.stringify(list))  // 存到数据库
            console.log(list) // 列出所有任务
        } else {
            console.log('Some other error: ', err.code);
        }
    });
} else if (verb == 'list') {
    // 展示当前所有任务
    const fileContent = fs.readFileSync('F:\\XUEXI-demo\\todolist-demo\\db').toString()
    const list = JSON.parse(fileContent)
    console.log(list)
} else if(verb == 'done'){
    // 某个任务已完成
    const fileContent = fs.readFileSync('F:\\XUEXI-demo\\todolist-demo\\db').toString()
    const list = JSON.parse(fileContent)
    const n = content
    list[n-1][1] = true
    fs.writeFileSync('F:\\XUEXI-demo\\todolist-demo\\db', JSON.stringify(list))
    console.log(list)
}else if(verb == 'edit'){
    // 编辑某个任务
    const fileContent = fs.readFileSync('F:\\XUEXI-demo\\todolist-demo\\db').toString()
    const list = JSON.parse(fileContent)
    const n = content
    list[n-1][0] = content2
    fs.writeFileSync('F:\\XUEXI-demo\\todolist-demo\\db', JSON.stringify(list))
    console.log(list)
}else if (verb == 'delete') {
    // 删除某个任务
    const fileContent = fs.readFileSync('F:\\XUEXI-demo\\todolist-demo\\db').toString()
    const list = JSON.parse(fileContent)
    const n = content //传入的是删除第几号
    list.splice(n-1, 1)  //从0开始算
    fs.writeFileSync('F:\\XUEXI-demo\\todolist-demo\\db', JSON.stringify(list)) // 把删除后的存进数据库
    console.log(list)
} else {
    console.log('你的动词是：' + verb + ',我不知道你想干啥')
}