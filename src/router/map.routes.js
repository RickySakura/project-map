export default {
  path: '/map',
  component: () => import('@/views/Map/index.vue'),
  redirect: '/map/group',
  children: [
    {
      name: 'overview',
      path: 'overview',
      component: () => import('@/views/Map/pages/OverviewMap.vue')
    },
    {
      name: 'group',
      path: 'group',
      component: () => import('@/views/Map/pages/GroupMap.vue')
    },
    {
      name: 'running-school',
      path: 'running-school',
      component: () => import('@/views/Map/pages/RunningSchoolMap.vue')
    },
    {
      name: 'epidemic',
      path: 'epidemic',
      component: () => import('@/views/Map/pages/EpidemicMap.vue')
    },
    {
      name: 'degree',
      path: 'degree',
      component: () => import('@/views/Map/pages/DegreeMap.vue')
    },
    {
      name: 'examination',
      path: 'examination',
      component: () => import('@/views/Map/pages/ExaminationMap.vue')
    }
  ]
}