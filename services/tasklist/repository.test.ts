import { Tasklist } from '@prisma/client'
import { prismaMock } from '../../test/singleton'
import { createTasklist, getTasklistById, getTasklists } from './repository'

const mockTasklist: Tasklist = {
  id: '1',
  title: 'mock tasklist',
}

describe(createTasklist, () => {
  it('returns created tasklist, given that request is valid', async () => {
    prismaMock.tasklist.create.mockResolvedValue(mockTasklist)
    const createdTasklist = await createTasklist(mockTasklist.title)
    expect(createdTasklist).toEqual(mockTasklist)
  })

  it('throws error, given that tasklist title is invalid', async () => {
    expect(createTasklist('')).rejects.toThrow()
  })
})

describe(getTasklistById, () => {
  it('returns tasklist, given that there is tasklist in store', async () => {
    prismaMock.tasklist.findUniqueOrThrow.mockResolvedValue(mockTasklist)

    const tasklist = await getTasklistById(mockTasklist.id)
    expect(tasklist).toEqual(mockTasklist)
  })

  it('calls correct prisma query', async () => {
    await getTasklistById(mockTasklist.id)
    expect(prismaMock.tasklist.findUniqueOrThrow).toBeCalledWith({
      where: {
        id: mockTasklist.id,
      },
      include: {
        tasks: true,
      },
    })
  })
})

describe(getTasklists, () => {
  it('returns tasklists, given that there is tasklist in store', async () => {
    prismaMock.tasklist.findMany.mockResolvedValue([mockTasklist])
    const tasklists = await getTasklists()
    expect(tasklists).toEqual([mockTasklist])
  })

  it('calls findMany with tasks', async () => {
    await getTasklists()
    expect(prismaMock.tasklist.findMany).toBeCalledWith({
      include: {
        tasks: true,
      },
    })
  })
})
