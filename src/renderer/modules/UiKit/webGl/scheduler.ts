interface Task {
  func: (...params: any) => any;
  params: any[];
}

interface TaskWithDelay extends Task {
  delay: number;
  time: number;
}

export class Scheduler {
  private _delayTasks: Array<TaskWithDelay | null> = [];
  private _nextTasks: Array<Task | null> = [];
  private _deferTasks: Array<Task | null> = [];
  private _highTasks: Array<Task | null> = [];
  private _usurpTask: Array<Task | null> = [];
  private _enterFrameTasks: Array<Task | null> = [];

  private _enterFrameTasksActiveCount = 0;
  private _idTable = 0;
  private _deltaTime = 0;

  private _startTime = new Date().getTime();

  private _looping = false;

  get deltaTime(): number {
    return this._deltaTime;
  }

  frameRate = 60;

  addEF(func: () => any, params: any[] = []) {
    const id = this._idTable;

    this._enterFrameTasks[id] = { func, params };
    this._enterFrameTasksActiveCount++;
    this._idTable++;
    this._loop();

    return id;
  }

  removeEF(id: number) {
    if (this._enterFrameTasks[id]) {
      this._enterFrameTasks[id] = null;
      this._enterFrameTasksActiveCount--;
      this._loop();
      return -1;
    }
    return false;
  }

  delay(func: () => any, params: any[], delay: number) {
    const now = new Date().getTime();
    this._delayTasks.push({
      func,
      params,
      delay,
      time: now,
    });
  }

  defer(func: () => any, params: any[] = []) {
    this._deferTasks.push({ func, params });
    this._loop();
  }

  next(func: () => any, params: any[] = []) {
    this._nextTasks.push({ func, params });
    this._loop();
  }

  usurp(func: () => any, params: any[] = []) {
    this._usurpTask.push({ func, params });
    this._loop();
  }

  private _process() {
    let task;
    let frameTime;

    for (const task of this._enterFrameTasks) {
      if (task) {
        task.func(...task.params);
      }
    }

    for (; 0 < this._highTasks.length; ) {
      task = this._highTasks.pop();
      if (task) {
        task.func(task.params);
      }
    }

    let now = new Date().getTime();
    this._deltaTime = (now - this._startTime) / 1000;

    for (const [i, task] of this._delayTasks.entries()) {
      if (task) {
        if (now - task.time > task.delay) {
          task.func(task.params);
          this._delayTasks.splice(i, 1);
        }
      }
    }

    now = new Date().getTime();
    this._deltaTime = (now - this._startTime) / 1000;
    frameTime = 1000 / this.frameRate;

    for (; 0 < this._deferTasks.length; ) {
      task = this._deferTasks.shift();

      if (task) {
        if (!(new Date().getTime() - now < frameTime)) {
          this._deferTasks.unshift(task);
          break;
        }
        task.func(task.params);
      }
    }

    now = new Date().getTime();
    this._deltaTime = (now - this._startTime) / 1000;
    frameTime = 1000 / this.frameRate;

    for (; 0 < this._usurpTask.length; ) {
      task = this._usurpTask.shift();

      if (task) {
        if (new Date().getTime() - now < frameTime) {
          task.func(task.params);
        }
      }
    }

    this._highTasks = this._highTasks.concat(this._nextTasks);
    this._nextTasks = [];
    this._usurpTask = [];
  }

  private _loop() {
    if (this._looping) {
      return;
    }
    this._looping = true;

    this._process();

    if (
      this._enterFrameTasksActiveCount ||
      this._delayTasks.length ||
      this._nextTasks.length ||
      this._deferTasks.length ||
      this._highTasks.length ||
      this._usurpTask.length
    ) {
      window.requestAnimationFrame(() => {
        this._looping = false;
        this._loop();
      });
    } else {
      this._looping = false;
    }
  }
}
