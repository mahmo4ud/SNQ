type BreadcrumbItem = {
  label: string
  href?: string
}

type RouteMap = {
  [key: string]: {
    translationKey: string
    parent?: string
  }
}

// Map of routes to their translation keys and parent routes
const routeMap: RouteMap = {
  // Home
  '/': { translationKey: 'navbar:home' },
  
  // About Us section
  '/our-message': { translationKey: 'navbar:aboutUs.ourMessage', parent: '/' },
  '/our-vision': { translationKey: 'navbar:aboutUs.ourVision', parent: '/' },
  '/our-values': { translationKey: 'navbar:aboutUs.ourValues', parent: '/' },
  
  // Advantages section
  '/our-professional-approach': { translationKey: 'navbar:advantages.professionalApproach', parent: '/' },
  '/accreditations': { translationKey: 'navbar:advantages.accreditations', parent: '/' },
  
  // Services
  '/services': { translationKey: 'navbar:services', parent: '/' },
  
  // Legal Consultations
  '/legal-consultations': { translationKey: 'navbar:legalConsultations.startConsultation', parent: '/' },
  
  // News & Articles
  '/articles': { translationKey: 'navbar:news.articles', parent: '/' },
  '/news': { translationKey: 'navbar:news.newsAndEvents', parent: '/' },
  
  // Join Us
  '/join-us': { translationKey: 'navbar:joinUs.title', parent: '/' },
  
  // Contact Us
  '/contact-us': { translationKey: 'navbar:contactUs', parent: '/' },
}

/**
 * Generate breadcrumb items from pathname based on navbar structure
 * @param pathname - Current pathname (e.g., "/ar/our-message" or "/ar/news/123")
 * @param t - Translation function from useT hook
 * @param currentPageTitle - Optional title for dynamic pages (e.g., news article title)
 * @returns Array of breadcrumb items
 */
export function generateBreadcrumbs(
  pathname: string,
  t: (key: string) => string,
  currentPageTitle?: string
): BreadcrumbItem[] {
  // Remove language prefix (e.g., /ar/ or /en/)
  const pathWithoutLang = pathname.replace(/^\/(ar|en)/, '') || '/'
  
  const breadcrumbs: BreadcrumbItem[] = []
  
  // Check if this is a dynamic route (e.g., /news/123, /articles/456)
  const dynamicRouteMatch = pathWithoutLang.match(/^(\/news|\/articles)\/(.+)$/)
  
  if (dynamicRouteMatch) {
    const [, basePath] = dynamicRouteMatch
    const baseRoute = routeMap[basePath]
    
    if (baseRoute) {
      // Build parent chain for the base route
      const buildChain = (path: string): void => {
        const route = routeMap[path]
        if (!route) return
        
        if (route.parent) {
          buildChain(route.parent)
        }
        
        breadcrumbs.push({
          label: t(route.translationKey),
          href: path
        })
      }
      
      buildChain(basePath)
      
      // Add current dynamic page (no href as it's the current page)
      if (currentPageTitle) {
        breadcrumbs.push({
          label: currentPageTitle,
          href: undefined
        })
      }
      
      return breadcrumbs
    }
  }
  
  // Find the current route in the map (for static routes)
  const currentRoute = routeMap[pathWithoutLang]
  
  if (!currentRoute) {
    // If route not found, return just home
    return [{ label: t('navbar:home'), href: '/' }]
  }
  
  // Build breadcrumb chain by following parent links
  const buildChain = (path: string): void => {
    const route = routeMap[path]
    if (!route) return
    
    // Add parent first (recursive)
    if (route.parent) {
      buildChain(route.parent)
    }
    
    // Add current route
    breadcrumbs.push({
      label: t(route.translationKey),
      href: path === pathWithoutLang ? undefined : path // No href for current page
    })
  }
  
  buildChain(pathWithoutLang)
  
  return breadcrumbs
}
