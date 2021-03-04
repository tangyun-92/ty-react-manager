const menuList = [
  {
    title: '基础数据管理',
    key: '/basic-data',
    children: [
      {
        title: '考试计划',
        key: '/basic-data/test-plan',
      },
      {
        title: '考生报名信息',
        key: '/basic-data/report-info',
      },
      {
        title: '考生编排',
        key: '/basic-data/stu-choreography',
      },
      {
        title: '工作人员信息',
        key: '/basic-data/per-info',
      },
      {
        title: '监考人员编排',
        key: '/basic-data/per-arrangement',
      },
      {
        title: '考试管理机构',
        key: '/basic-data/exam-institution',
      },
      {
        title: '考试安排管理',
        key: '/basic-data/exam-arrangement',
      },
      {
        title: '考点信息',
        key: '/basic-data/exam-site-info',
      },
      {
        title: '报名照片',
        key: '/basic-data/registration-photo',
      },
      {
        title: '验证数据包',
        key: '/basic-data/validate-packets',
      },
    ],
  },
  {
    title: '认证数据管理',
    key: '/certification-data',
    children: [
      {
        title: '考生认证情况',
        key: '/certification-data/stu-case',
      },
      {
        title: '考生认证统计',
        key: '/certification-data/stu-statistical',
      },
      {
        title: '工作人员认证情况',
        key: '/certification-data/per-case',
      },
      {
        title: '工作人员认证统计',
        key: '/certification-data/per-statistical',
      },
      {
        title: '人工审核',
        key: '/certification-data/human-review',
      },
    ],
  },
  {
    title: '考点系统管理',
    key: '/test-system',
    children: [
      {
        title: '考点系统信息',
        key: '/test-system/test-info',
      },
      {
        title: '终端设备管理',
        key: '/test-system/device-management',
      },
      {
        title: '设备使用统计',
        key: '/test-system/device-info',
      },
    ],
  },
  {
    title: '消息推送管理',
    key: '/message-management',
    children: [
      {
        title: '消息推送',
        key: '/message-management/message-push',
      },
      {
        title: '消息查询',
        key: '/message-management/message-query',
      },
    ],
  },
  {
    title: '缺考违纪管理',
    key: '/lack-discipline',
    children: [
      {
        title: '缺考管理',
        key: '/lack-discipline/lack-management',
      },
      {
        title: '违纪管理',
        key: '/lack-discipline/discipline-management',
      },
    ],
  },
  {
    title: '接口管理',
    key: '/interface-management',
    children: [
      {
        title: '接口信息管理',
        key: '/interface-management/interface-info',
      },
      {
        title: '接口账号管理',
        key: '/interface-management/interface-account',
      },
    ],
  },
  {
    title: '用户权限管理',
    key: '/permissions-management',
    children: [
      {
        title: '菜单管理',
        key: '/permissions-management/menu-management',
      },
      {
        title: '角色管理',
        key: '/permissions-management/role-management',
      },
      {
        title: '用户管理',
        key: '/permissions-management/user-management',
      },
    ],
  },
  {
    title: '日志管理',
    key: '/log-management',
    children: [
      {
        title: '日志查询',
        key: '/log-management/log-query'
      }
    ]
  }
]
export default menuList
