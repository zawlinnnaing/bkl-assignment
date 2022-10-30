import { Tasklist } from '@prisma/client'
import { prismaMock } from '../../test/singleton'
import { createTasklist, getTasklistById } from './repository'

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
  it('returns tasklist', async () => {
    prismaMock.tasklist.findUniqueOrThrow.mockResolvedValue(mockTasklist)

    const tasklist = await getTasklistById(mockTasklist.id)
    expect(tasklist).toEqual(mockTasklist)
  })
})
