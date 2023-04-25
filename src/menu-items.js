const menuItems = {
  items: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard",
          icon: "feather icon-home",
        },
        {
          id: "users",
          title: "Users",
          type: "item",
          url: "/users",
          icon: "feather icon-users",
        },
        {
          id: "un-representative",
          title: "UN Representative",
          type: "item",
          url: "/un-representative",
          icon: "feather icon-users",
        },
        {
          id: "staticContent",
          title: "Content",
          type: "item",
          url: "/contents",
          icon: "feather icon-file-minus",
        },
        // {
        //   id: 'sub-admin-management',
        //   title: 'Sub Admin Management',
        //   type: 'item',
        //   url: '/app/subAdminManagement/default',
        //   icon: 'feather icon-home',
        // },
        // {
        //   id: 'roles-permission-management',
        //   title: 'Roles & Permissions Management',
        //   type: 'item',
        //   url: '/app/rolesPermissionsManagement/default',
        //   icon: 'feather icon-home',
        // },
        // {
        //   id: 'activity-management',
        //   title: 'Activity Management',
        //   type: 'collapse',
        //   icon: 'feather icon-menu',
        //   children: [
        //     {
        //       id: 'menu-level-1.1',
        //       title: 'Membership management',
        //       type: 'item',
        //       url: '#!'
        //     },
        //     {
        //       id: 'menu-level-1.2',
        //       title: 'Progress Management',
        //       type: 'item',
        //       url: '#!'
        //     },
        //     {
        //       id: 'menu-level-1.3',
        //       title: 'Bookings Management',
        //       type: 'item',
        //       url: '#!'
        //     },
        //     {
        //       id: 'menu-level-1.4',
        //       title: 'Plans Management',
        //       type: 'item',
        //       url: '#!'
        //     },
        //   ]
        // },
        // {
        //   id: 'transactions-log',
        //   title: 'Transactions Log',
        //   type: 'item',
        //   url: '/app/transactionsLog/default',
        //   icon: 'feather icon-home',
        // },
        // {
        //   id: 'customized-workout-plans-management',
        //   title: 'Customized Workout Plans Management',
        //   type: 'item',
        //   url: '/app/customizedWorkoutPlans/default',
        //   icon: 'feather icon-home',
        // },
        // {
        //   id: 'offer-and-promocode-management',
        //   title: 'Offer & PromoCode Management',
        //   type: 'item',
        //   url: '/app/offerAndPromocodeManagement/default',
        //   icon: 'feather icon-home',
        // },
        // {
        //   id: 'media-management',
        //   title: 'Media Management',
        //   type: 'item',
        //   url: '/app/mediaManagement/default',
        //   icon: 'feather icon-home',
        // },
        // {
        //   id: 'reports',
        //   title: 'Reports',
        //   type: 'collapse',
        //   icon: 'feather icon-menu',
        //   children: [
        //     {
        //       id: 'menu-level-1.1',
        //       title: 'Revenue Reports',
        //       type: 'item',
        //       url: '#!'
        //     },
        //     {
        //       id: 'menu-level-1.2',
        //       title: 'Services Report',
        //       type: 'item',
        //       url: '#!'
        //     },
        //     {
        //       id: 'menu-level-1.3',
        //       title: 'Bookings Report',
        //       type: 'item',
        //       url: '#!'
        //     },
        //     {
        //       id: 'menu-level-1.4',
        //       title: 'Finance Report',
        //       type: 'item',
        //       url: '#!'
        //     },
        //   ]
        // },
        // {
        //   id: 'reviews-management',
        //   title: 'Reviews Management',
        //   type: 'item',
        //   url: '/app/mediaManagement/default',
        //   icon: 'feather icon-home',
        // },
      ],
    },
    // {
    //   id: 'ui-element',
    //   title: 'UI ELEMENT',
    //   type: 'group',
    //   icon: 'icon-ui',
    //   children: [
    //     {
    //       id: 'basic',
    //       title: 'Component',
    //       type: 'collapse',
    //       icon: 'feather icon-box',
    //       children: [
    //         {
    //           id: 'button',
    //           title: 'Button',
    //           type: 'item',
    //           url: '/basic/button'
    //         },
    //         {
    //           id: 'badges',
    //           title: 'Badges',
    //           type: 'item',
    //           url: '/basic/badges'
    //         },
    //         {
    //           id: 'breadcrumb',
    //           title: 'Breadcrumb',
    //           type: 'item',
    //           url: '/basic/breadcrumb'
    //         },
    //         {
    //           id: 'pagination',
    //           title: 'Pagination',
    //           type: 'item',
    //           url: '/basic/pagination'
    //         },
    //         {
    //           id: 'collapse',
    //           title: 'Collapse',
    //           type: 'item',
    //           url: '/basic/collapse'
    //         },
    //         {
    //           id: 'tabs-pills',
    //           title: 'Tabs & Pills',
    //           type: 'item',
    //           url: '/basic/tabs-pills'
    //         },
    //         {
    //           id: 'typography',
    //           title: 'Typography',
    //           type: 'item',
    //           url: '/basic/typography'
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   id: 'forms-tables',
    //   title: 'Forms & Tables',
    //   type: 'group',
    //   icon: 'icon-group',
    //   children: [
    //     {
    //       id: 'forms',
    //       title: 'Form Elements',
    //       type: 'item',
    //       url: '/forms/form-basic',
    //       icon: 'feather icon-file-text',
    //     },
    //     {
    //       id: 'tables',
    //       title: 'Table',
    //       type: 'item',
    //       url: '/tables/bootstrap',
    //       icon: 'feather icon-server',
    //     }
    //   ]
    // },
    // {
    //   id: 'chart-maps',
    //   title: 'Chart & Maps',
    //   type: 'group',
    //   icon: 'icon-charts',
    //   children: [
    //     {
    //       id: 'charts',
    //       title: 'Charts',
    //       type: 'item',
    //       url: '/charts/nvd3',
    //       icon: 'feather icon-pie-chart'
    //     },
    //     {
    //       id: 'maps',
    //       title: 'Map',
    //       type: 'item',
    //       url: '/maps/google-map',
    //       icon: 'feather icon-map'
    //     }
    //   ]
    // },
    // {
    //   id: 'pages',
    //   title: 'Pages',
    //   type: 'group',
    //   icon: 'icon-pages',
    //   children: [
    //     {
    //       id: 'auth',
    //       title: 'Authentication',
    //       type: 'collapse',
    //       icon: 'feather icon-lock',
    //       badge: {
    //         title: 'New',
    //         type: 'label-danger'
    //       },
    //       children: [
    //         {
    //           id: 'signup-1',
    //           title: 'Sign up',
    //           type: 'item',
    //           url: '/auth/signup-1',
    //           target: true,
    //           breadcrumbs: false
    //         },
    //         {
    //           id: 'signin-1',
    //           title: 'Sign in',
    //           type: 'item',
    //           url: '/auth/signin-1',
    //           target: true,
    //           breadcrumbs: false
    //         }
    //       ]
    //     },
    //     {
    //       id: 'sample-page',
    //       title: 'Sample Page',
    //       type: 'item',
    //       url: '/sample-page',
    //       classes: 'nav-item',
    //       icon: 'feather icon-sidebar'
    //     },
    //     {
    //       id: 'documentation',
    //       title: 'Documentation',
    //       type: 'item',
    //       icon: 'feather icon-help-circle',
    //       classes: 'nav-item',
    //       url: 'https://codedthemes.com/item/datta-able-react-free-admin-template/#',
    //       target: true,
    //       external: true
    //     },
    //     {
    //       id: 'menu-level',
    //       title: 'Menu Levels',
    //       type: 'collapse',
    //       icon: 'feather icon-menu',
    //       children: [
    //         {
    //           id: 'menu-level-1.1',
    //           title: 'Menu Level 1.1',
    //           type: 'item',
    //           url: '#!'
    //         },
    //         {
    //           id: 'menu-level-1.2',
    //           title: 'Menu Level 2.2',
    //           type: 'collapse',
    //           children: [
    //             {
    //               id: 'menu-level-2.1',
    //               title: 'Menu Level 2.1',
    //               type: 'item',
    //               url: '#'
    //             },
    //             {
    //               id: 'menu-level-2.2',
    //               title: 'Menu Level 2.2',
    //               type: 'collapse',
    //               children: [
    //                 {
    //                   id: 'menu-level-3.1',
    //                   title: 'Menu Level 3.1',
    //                   type: 'item',
    //                   url: '#'
    //                 },
    //                 {
    //                   id: 'menu-level-3.2',
    //                   title: 'Menu Level 3.2',
    //                   type: 'item',
    //                   url: '#'
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       id: 'disabled-menu',
    //       title: 'Disabled Menu',
    //       type: 'item',
    //       url: '#',
    //       classes: 'nav-item disabled',
    //       icon: 'feather icon-power'
    //     }
    //   ]
    // }
  ],
};

export default menuItems;
