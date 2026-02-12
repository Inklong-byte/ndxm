// 纯JS引入VS Code核心API（官方固定写法）
const vscode = require('vscode');

// 插件激活入口（官方固定函数名，不能改）
function activate(context) {
	// 1. 插件激活时，控制台打印日志（用于验证）
	console.log('✅ 智能编码助手（JS版）已激活！');
	// 2. 插件激活时，弹出直观提示（确认加载成功）
	vscode.window.showInformationMessage('✅ 智能编码助手加载成功，可执行命令生成函数模板！');

	// 3. 注册命令（命令ID必须和package.json里的command完全一致，官方默认code-extension.helloWorld）
	let disposable = vscode.commands.registerCommand('ndxm.helloWorld', function () {
		// 你的核心功能：获取当前编辑器，在光标位置插入函数模板
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('⚠️ 请先打开一个JS/TS文件！');
			return;
		}

		// 要插入的函数模板（纯JS，无任何TS语法）
		const funcTemplate = `/**
 * 自定义函数模板 - 智能编码助手生成
 * @param params 函数入参
 * @returns 函数返回值
 */
function customCodeFunction(params) {
    try {
        // 在这里编写你的业务逻辑
        return params;
    } catch (error) {
        console.error('函数执行错误：', error);
        return null;
    }
}

// 调用示例
customCodeFunction('智能编码助手测试');
`;

		// 将模板插入到当前光标位置（VS Code编辑器API固定写法）
		editor.edit(editBuilder => {
			const cursorPos = editor.selection.active;
			editBuilder.insert(cursorPos, funcTemplate);
		});

		// 插入成功提示
		vscode.window.showInformationMessage('🎉 函数模板生成成功！');
	});

	// 必须将命令加入上下文（官方固定步骤，否则命令无效）
	context.subscriptions.push(disposable);
}

// 插件销毁入口（官方固定写法，空函数即可）
function deactivate() {}

// 暴露激活/销毁函数（官方固定写法，让VS Code识别）
module.exports = {
	activate,
	deactivate
};