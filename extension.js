const vscode = require('vscode');

// 1. 定义补全规则（你自己写的第一个补全项）
const MY_COMPLETIONS = [
    {
        label: 'myfunc', // 触发关键词：输入myfunc就会显示这个补全
        detail: '自定义函数补全（自己写的第一个补全）', // 鼠标悬停提示
        kind: vscode.CompletionItemKind.Function, // 函数图标
        // 补全后插入的代码（带可编辑占位符）
        insertText: new vscode.SnippetString(`/**
 * \${1:myCustomFunc} - 自己写的函数
 * @param {\${2:string}} param 入参
 * @returns {\${3:string}} 返回值
 */
function \${1:myCustomFunc}(\${2:param}) {
    console.log('自己写的补全生效了！', \${2:param});
    return \${2:param};
}`)
    }
];

// 2. 注册补全提供器（核心：告诉VS Code什么时候触发补全）
function registerMyCompletion() {
    return vscode.languages.registerCompletionItemProvider(
        ['javascript'], // 只在JS文件生效
        {
            // 每次输入字符时，VS Code会调用这个方法生成补全项
            provideCompletionItems() {
                // 把自定义规则转成VS Code能识别的补全项
                return MY_COMPLETIONS.map(item => {
                    const completionItem = new vscode.CompletionItem(item.label);
                    completionItem.detail = item.detail;
                    completionItem.kind = item.kind;
                    completionItem.insertText = item.insertText;
                    return completionItem;
                });
            }
        },
        'myfunc' // 触发前缀：输入myfunc时强制弹出补全
    );
}

// 3. 插件激活入口（注册补全）
function activate(context) {
    console.log('✅ 自己写的补全插件已激活！');
    // 注册补全并加入上下文（必须加，否则不生效）
    const completionDisposable = registerMyCompletion();
    context.subscriptions.push(completionDisposable);
}

function deactivate() {}

module.exports = { activate, deactivate };