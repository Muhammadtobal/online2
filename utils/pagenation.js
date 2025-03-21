export async function paginate(
  repository, 
  page = 1,
  limit = 10,
  relations = []
) {
  const skip = (page - 1) * limit;

  const data = await repository.findMany({ 
    skip,
    take: limit,
  });

  return data;
}

export async function getPaginationInfo(
  repository,
  page = 1,
  limit= 10
)
  {
  const totalItems = await repository.count();
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    totalPages,
    currentPage: page,
    limit: limit,
  };
}
export default { paginate, getPaginationInfo };