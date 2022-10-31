import { Task, TaskStatus } from '@prisma/client'
import {
  TaskStatus as GqlTaskStatus,
  UpdateTaskInput,
} from '../../generated/types'
import { prismaMock } from '../../test/singleton'
import {
  createTask,
  getTaskById,
  getTasks,
  moveTask,
  updateTask,
} from './repository'

const mockTask: Task = {
  id: '1',
  position: 0,
  title: 'test task',
  list_id: '1',
  status: TaskStatus.Active,
}
describe(createTask, () => {
  it('returns created task, given that input is valid', async () => {
    prismaMock.task.create.mockResolvedValue(mockTask)

    const createdTask = await createTask({
      list_id: mockTask.list_id,
      title: mockTask.title,
    })
    expect(createdTask).toEqual(mockTask)
  })

  it('calls increase other tasks position, given that task is created', async () => {
    await createTask({
      list_id: '1',
      title: 'test task',
    })
    expect(prismaMock.task.updateMany).toBeCalledWith({
      where: {
        list_id: mockTask.list_id,
        position: {
          gte: 0,
        },
      },
      data: {
        position: {
          increment: 1,
        },
      },
    })
  })

  it('throws error, given that task title is not valid', async () => {
    expect(
      createTask({
        title: '',
        list_id: '1',
      })
    ).rejects.toThrow()
  })
})

describe(updateTask, () => {
  it('calls prisma client update task, given that request is valid', async () => {
    const updatePayload: UpdateTaskInput = {
      status: GqlTaskStatus.Completed,
    }
    await updateTask('1', updatePayload)
    expect(prismaMock.task.update).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: updatePayload,
    })
  })
})

describe(moveTask, () => {
  it('calls update task and find task, given that task is moved', async () => {
    prismaMock.task.findUniqueOrThrow.mockResolvedValue(mockTask)
    await moveTask(mockTask.id, '2', 2)
    expect(prismaMock.task.updateMany).toBeCalledTimes(2)
    expect(prismaMock.task.updateMany.mock.calls).toEqual([
      [
        {
          where: { list_id: '2', position: { gte: 2 } },
          data: { position: { increment: 1 } },
        },
      ],
      [
        {
          where: { list_id: '1', position: { gt: 0 } },
          data: { position: { decrement: 1 } },
        },
      ],
    ])
    expect(prismaMock.task.update).toBeCalledWith({
      where: {
        id: mockTask.id,
      },
      data: {
        list_id: '2',
        position: 2,
      },
    })
  })
})

describe(getTasks, () => {
  it('returns tasks, given that there is task in data store', async () => {
    prismaMock.task.findMany.mockResolvedValue([mockTask])
    const tasks = await getTasks()
    expect(tasks).toEqual([mockTask])
  })

  it('returns empty array, given that there is no task in data store', async () => {
    prismaMock.task.findMany.mockResolvedValue([])
    const tasks = await getTasks()
    expect(tasks).toEqual([])
  })
})

describe(getTaskById, () => {
  it('returns task, given that there is task in data store', async () => {
    prismaMock.task.findUniqueOrThrow.mockResolvedValue(mockTask)
    const task = await getTaskById(mockTask.id)
    expect(prismaMock.task.findUniqueOrThrow).toBeCalledWith({
      where: {
        id: mockTask.id,
      },
    })
    expect(task).toEqual(mockTask)
  })
})
