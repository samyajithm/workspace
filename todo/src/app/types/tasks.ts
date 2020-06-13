export interface Tasks {
  pending: List[],
  completed: List[]
}

export interface List {
  name: string,
  index: string | number,
  important?: boolean,
  completed? : boolean,
  completedOn?: Date,
  createdOn?: Date,
  dueBy?: Date,
  description?: string,
  hideItem: boolean
}

export interface DialogData {
  title: string,
  content?: any,
  confirmButton?: string,
  cancelButton?: string,
  taskItem?: List,
  isFieldDisabled?: boolean
}

export interface Sidebar {
  link: string,
  translateKey: any,
  iconName: string,
}
