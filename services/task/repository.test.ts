import { Task, TaskStatus } from '@prisma/client'
import {
  TaskStatus as GqlTaskStatus,
  UpdateTaskInput,
} from '../../generated/types'
import { prismaMock } from '../../test/singleton'
import { createTask, updateTask } from './repository'

describe(createTask, () => {
  it('returns created task, given that input is valid', async () => {
    const mockTask: Task = {
      id: '1',
      position: 0,
      title: 'test task',
      list_id: '1',
      status: TaskStatus.Active,
    }
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