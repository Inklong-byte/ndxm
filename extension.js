const vscode = require('vscode');

// 核心：只定义一个最简单的补全项
function activate(context) {
    // 1. 注册补全提供器（强制对所有JS文件生效）
    const disposable = vscode.languages.registerCompletionItemProvider(
        'javascript', // 仅JS文件生效
        {
            // 2. 每次输入字符都返回补全项
            provideCompletionItems() {
                // 创建补全项：输入myfunc就显示
                const completion = new vscode.CompletionItem('myfunc');
                // 补全后插入的代码
                completion.insertText = new vscode.SnippetString(`
function myCustomFunc() {
    console.log('补全成功！这是你自己写的补全');
}
`);
                // 补全项描述（鼠标悬停显示）
                completion.detail = '测试补全 - 自己写的第一个补全';
                // 补全项图标（函数图标）
                completion.kind = vscode.CompletionItemKind.Function;
                
                // 返回补全项（必须返回数组）
                return [completion];
            }
        },
        // 触发前缀：输入myfunc的任意字符都触发
        'm', 'my', 'myf', 'myfu', 'myfun', 'myfunc'
    );

    // 3. 必须加入上下文（否则插件销毁时会失效）
    context.subscriptions.push(disposable);
    // 4. 打印激活日志（确认插件启动）
    console.log('✅ 极简补全插件已激活！');
    vscode.window.showInformationMessage('✅ 补全插件已激活，输入myfunc测试！');
}

function deactivate() {}

module.exports = { activate, deactivate };