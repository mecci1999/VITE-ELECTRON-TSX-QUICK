import chalk from 'chalk'; // 打印字体颜色
import { watch } from 'rollup';
import ElectronConnent from 'electron-connect';
import rollupTasks from '../rollupTasks';
import { Socket } from 'net';
import waitOn from 'wait-on';

enum ElectronState {
  init = 'init'
}

const watchFunc = function () {
  const watcher = watch(rollupTasks);
  watcher.on('change', (filename) => {
    console.info(chalk.green('监听文件改变：'), `change -- ${filename}`);
  });
  watcher.on('event', (ev) => {
    if (ev.code === 'END') {
      const el = ElectronConnent.server.create({ stopOnClose: true });
      if (el.electronState === ElectronState.init) {
        el.start();
        console.log(chalk.green('Electron项目启动\n'));
      } else {
        el.restart();
        console.log(chalk.green('Electron项目重新启动'));
      }
    } else if (ev.code === 'ERROR') {
      console.log(chalk.red('Electron项目构建失败: '), ev.error);
    }
  });
};
waitOn(
  {
    resources: [`http://localhost:${process.env.VITE_APP_PORT}`],
    timeout: 5000
  },
  (err) => {
    if (err) {
      const { port, hostname } = new URL(`http://localhost:${process.env.VITE_APP_PORT}`);
      const serverSocket = new Socket().connect(Number(port) || 80, hostname, () => {
        watchFunc();
      });
      serverSocket.on('error', (e) => {
        console.log(chalk.red('Electron项目构建失败: '), e);
        process.exit(1);
      });
    } else {
      watchFunc();
    }
  }
);
