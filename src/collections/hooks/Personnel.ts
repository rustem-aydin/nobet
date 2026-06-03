export const personnelBeforeChange = async ({ operation, data, req }: any) => {
  if (operation === 'create') {
    // En yüksek rank'ı bul ve +1 artır
    const lastPerson = await req.payload.find({
      collection: 'personnel',
      sort: '-rank',
      limit: 1,
    })

    const maxRank = lastPerson.docs[0]?.rank || 0
    data.rank = maxRank + 1
  }
  return data
}
