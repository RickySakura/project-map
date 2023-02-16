/** 用于过滤掉学校列表中的一些不想优先展示的学校类型，使其点位不显示在地图上 */
export function useRunningTypeFilter(
  schoolList = [],
  filterRunningTypes = [93]
) {
  let filterList = schoolList.filter((item) => {
    return !filterRunningTypes.includes(Number(item.runningType));
  });
  return filterList.length > 0 ? filterList : schoolList;
}
