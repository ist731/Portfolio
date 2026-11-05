import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react"

const asset = (name: string) => `/assets/${name}`

type Project = {
  title: string
  subtitle: string
  image: string
  logo: string
  featured?: boolean
}

const featured: Project[] = [
  { title: "MTS Tenvision", subtitle: "Базовые сценарии", image: "TenVision.png", logo: "project-logos/mts.png" },
  { title: "MTS Markup", subtitle: "Ключевые факторы", image: "Markup.png", logo: "project-logos/mts.png" },
  { title: "RocketWake", subtitle: "Задача организации", image: "RocketWake.png", logo: "project-logos/rocket-wake.png" },
]

const projects: Project[] = [
  { title: "Level Kitchen", subtitle: "Ключевые факторы", image: "Level Kitchen.png", logo: "project-logos/level-kitchen.png" },
  { title: "Ужин дома", subtitle: "Задача организации", image: "Ужин дома.png", logo: "project-logos/uzhin-doma.png" },
  { title: "TELEPORT", subtitle: "Базовые сценарии", image: "Teleport.png", logo: "project-logos/teleport.png" },
  { title: "Газпром", subtitle: "Базовые сценарии", image: "Газпром.png", logo: "project-logos/gazprom.png" },
  { title: "Intema AI", subtitle: "Базовые сценарии", image: "Intema.png", logo: "project-logos/intema.png" },
  { title: "Сбер маркет", subtitle: "Базовые сценарии", image: "Сбер маркет.png", logo: "project-logos/sbermarket.png" },
  { title: "Morpheus", subtitle: "Базовые сценарии", image: "Morpheus.png", logo: "project-logos/morpheus.png" },
  { title: "Стильные кухни", subtitle: "Базовые сценарии", image: "Стильные кухни.png", logo: "project-logos/stylish-kitchens.png" },
  { title: "How to eat", subtitle: "Базовые сценарии", image: "How to eat.png", logo: "project-logos/how-to-eat.png" },
  { title: "Europcar", subtitle: "Базовые сценарии", image: "Europcar.png", logo: "project-logos/europcar.png" },
  { title: "Team Idea", subtitle: "Базовые сценарии", image: "Team Idea.png", logo: "project-logos/tema-idea.png" },
  {
    title: "Любовь пирогова",
    subtitle: "Базовые сценарии",
    image: "Любовь пирогова.png",
    logo: "project-logos/lyubov-pirogova.png",
  },
  { title: "Inside mama", subtitle: "Базовые сценарии", image: "Inside mama.png", logo: "project-logos/inside-mama.png" },
  { title: "Datify", subtitle: "Базовые сценарии", image: "Datify.png", logo: "project-logos/datify.png" },
]

const navItems = [
  { label: "Проекты", href: "#projects" },
  { label: "Опыт работы", href: "#experience" },
  { label: "Достижения", href: "#awards" },
  { label: "Обо мне", href: "#about" },
  { label: "Контакты", href: "#contacts" },
]

const experienceItems = [
  {
    company: "OTP Bank",
    logo: "/assets/company-logos/otp.png",
    mark: "OTP",
    logoTone: "otp",
    href: "https://www.otpbank.ru/",
    companyDescription: "Розничный банк с продуктами для частных клиентов и бизнеса",
    dates: "Сейчас",
    role: "Ведущий дизайнер",
    description:
      "Развиваю продукты кредитных карт и экран платежей в мобильном приложении",
  },
  {
    company: "Wildberries",
    logo: "/assets/company-logos/wildberries.png",
    mark: "WB",
    logoTone: "wildberries",
    href: "https://www.wildberries.ru/",
    companyDescription: "Маркетплейс и технологическая платформа электронной торговли",
    dates: "Ноябрь 2024 — Июль 2025",
    role: "Ведущий дизайнер",
    description:
      "Разрабатывал B2B-продукты Tracker и CMDB/RM. Перевёл Tracker от MVP к Beta за квартал: к тестированию подключились 52 команды и более 500 пользователей. Помогал выстраивать дизайн-процессы в семи командах; после запуска дизайн-ревью ошибок в продакшене стало в четыре раза меньше",
  },
  {
    company: "МТС",
    logo: "/assets/company-logos/mts.png",
    mark: "МТС",
    logoTone: "mts",
    href: "https://mts.ru/",
    companyDescription: "Телеком-оператор и цифровая экосистема",
    dates: "Март 2022 — Сентябрь 2024",
    role: "Старший Product Designer",
    description:
      "Развивал AI-видеоаналитику TenVision от MVP до Enterprise: более 15 000 подключённых устройств и 20+ крупных функций. Создал Workstation и сервис разметки аудио Markup для Audiogram; проводил исследования и дизайн-ревью",
  },
  {
    company: "iBrush",
    logo: "/assets/company-logos/ibrush.png",
    mark: "iB",
    logoTone: "ibrush",
    href: "https://ibrush.ru/",
    companyDescription: "Digital-агентство: аналитика, дизайн и разработка сайтов и сервисов",
    dates: "Февраль 2021 — Март 2022",
    role: "Старший UI/UX дизайнер",
    description:
      "Создавал интерфейсы и UI-киты для 15+ проектов в FoodTech, RetailTech и E-Commerce. Выстроил сквозной дизайн-процесс, провёл 50+ защит решений перед клиентами и руководил командой из двух дизайнеров",
  },
  {
    company: "MST Digital Agency",
    logo: "/assets/company-logos/mst.png",
    mark: "MST",
    logoTone: "mst",
    href: "https://mst.agency/",
    companyDescription: "Digital-агентство полного цикла: стратегия, разработка и маркетинг",
    dates: "Июль 2020 — Январь 2021",
    role: "UI/UX дизайнер",
    description:
      "Спроектировал более 100 интерфейсов для Газпром Нефти, подготовил интерфейсы MVP-системы домофонии Дом.ру (к 2023 году подключено 130 000+ подъездов) и довёл EdTech-продукт Grow Heads от концепции до релиза",
  },
  {
    company: "SIMDEV",
    logo: "/assets/company-logos/simdev.png",
    mark: "SD",
    logoTone: "simdev",
    href: "https://simdev.ru/",
    companyDescription: "Разработчик ПО и решений для городской инфраструктуры",
    dates: "Октябрь 2017 — Июнь 2020",
    role: "UI/UX дизайнер",
    description:
      "Как единственный дизайнер группы создавал iViz и систему ЦОДД для городских служб, а также приложение EVO Life для 50 000+ пользователей. Решения помогли сократить обработку обращений в МЧС в 2,5 раза и опоздания транспорта на 70–75%",
  },
]

const principles = [
  {
    id: "value",
    label: "Задачи и ценности",
    title: "Запрос бизнеса — ещё не решение",
    description:
      "Я помогаю команде найти компромисс между достижением целей бизнеса и сохранением ценности для пользователя",
    tags: [
      "Голос пользователя",
      "Цель продукта",
      "Смысл запроса",
      "Реальная потребность",
      "Проверка решений",
      "Рабочий компромисс",
      "Польза для человека",
      "Аргументы и факты",
      "Взвешенные приоритеты",
    ],
  },
  {
    id: "whole-product",
    label: "Целостность продукта",
    title: "Продукт — это система связей, а не набор экранов",
    description:
      "Сценарии, интерфейсы и правила должны складываться в понятный опыт, а я учитываю, как каждое решение связано с остальным продуктом и что произойдёт, когда тот вырастет",
    tags: [
      "Целостный опыт",
      "Связанные сценарии",
      "Понятная структура",
      "Единые правила",
      "Дизайн-система",
      "Общие компоненты",
      "Доступность",
      "Рост без хаоса",
      "Логика продукта",
    ],
  },
  {
    id: "shared-work",
    label: "Совместная работа",
    title: "Дизайн — часть общего решения на всём пути",
    description:
      "Качество важно сохранить от обсуждения задачи до запуска: я помогаю команде договориться о направлении, учитывать реализацию и поддерживать ясные рабочие процессы",
    tags: [
      "Общий язык",
      "Обсуждение до макетов",
      "Защита решений",
      "Дизайн-ревью",
      "Рабочие процессы",
      "Учёт реализации",
      "Качество до запуска",
      "Лидерство по ситуации",
      "Общая ответственность",
    ],
  },
]

function AnimatedPrincipleText({ text, wordOffset = 0 }: { text: string; wordOffset?: number }) {
  let wordIndex = wordOffset
  const parts = text.match(/\s+|[^\s]+/gu) ?? [text]

  return (
    <>
      {parts.map((part, index) => {
        if (/^\s+$/u.test(part)) return part
        const currentWord = wordIndex++
        return (
          <span
            className="principles-word"
            key={`${index}-${part}`}
            style={{ "--word-index": currentWord } as CSSProperties}
          >
            {part}
          </span>
        )
      })}
    </>
  )
}

function PrincipleCloud({ tags }: { tags: string[] }) {
  type TagNode = { tag: string; element: HTMLSpanElement; x: number; y: number; vx: number; vy: number; width: number; height: number; angle: number }
  type TagDrag = { tag: string; pointerId: number; offsetX: number; offsetY: number; targetX: number; targetY: number }
  const cloudRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<SVGPathElement>(null)
  const nodesRef = useRef<TagNode[]>([])
  const dragRef = useRef<TagDrag | null>(null)
  const pointerRef = useRef<{ x: number; y: number } | null>(null)
  const frameRef = useRef<number | null>(null)
  const linkClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeLinkTagsRef = useRef<string[]>([])
  const settleUntilRef = useRef(0)

  const paintLinks = (forceFade = false) => {
    const cloud = cloudRef.current
    const field = fieldRef.current
    const path = linksRef.current
    const point = pointerRef.current
    if (!cloud || !field || !path) {
      path?.setAttribute("d", "")
      cloud?.classList.remove("is-magnetic")
      return
    }
    const clearLinksAfterFade = () => {
      if (linkClearTimerRef.current !== null) return
      linkClearTimerRef.current = window.setTimeout(() => {
        path.setAttribute("d", "")
        activeLinkTagsRef.current = []
        linkClearTimerRef.current = null
      }, 240)
    }
    if (!point) {
      cloud.classList.remove("is-magnetic")
      clearLinksAfterFade()
      return
    }
    const cloudRect = cloud.getBoundingClientRect()
    const candidates = nodesRef.current
      .map((node) => {
        const rect = node.element.getBoundingClientRect()
        const x = rect.left + rect.width / 2 - cloudRect.left
        const y = rect.top + rect.height / 2 - cloudRect.top
        return {
          tag: node.tag,
          x,
          y,
          distance: Math.hypot(point.x - rect.left - rect.width / 2, point.y - rect.top - rect.height / 2),
        }
      })
      .sort((a, b) => a.distance - b.distance)
    const nearest = candidates.filter((node) => node.distance < 440).slice(0, 4)
    const isExtended = nearest.length === 0 && activeLinkTagsRef.current.some((tag) =>
      candidates.some((node) => node.tag === tag && node.distance < 660),
    )
    const connected = nearest.length > 0
      ? nearest
      : activeLinkTagsRef.current
        .map((tag) => candidates.find((node) => node.tag === tag))
        .filter((node): node is (typeof candidates)[number] => Boolean(node))
        .slice(0, 4)
    if (nearest.length > 0) activeLinkTagsRef.current = nearest.map((node) => node.tag)
    const startX = point.x - cloudRect.left
    const startY = point.y - cloudRect.top
    cloud.style.setProperty("--cursor-x", `${startX}px`)
    cloud.style.setProperty("--cursor-y", `${startY}px`)
    const pathData = connected.map((node) => {
      const dx = node.x - startX
      const dy = node.y - startY
      const distance = Math.max(1, Math.hypot(dx, dy))
      const curveSign = Array.from(node.tag).reduce((sum, character) => sum + character.charCodeAt(0), 0) % 2 ? 1 : -1
      const curve = Math.min(14, distance * 0.08) * curveSign
      const controlX = (startX + node.x) / 2 - (dy / distance) * curve
      const controlY = (startY + node.y) / 2 + (dx / distance) * curve
      return `M ${startX} ${startY} Q ${controlX} ${controlY} ${node.x} ${node.y}`
    }).join(" ")
    if (pathData) {
      path.setAttribute("d", pathData)
      if (!forceFade && (nearest.length > 0 || isExtended)) {
        if (linkClearTimerRef.current !== null) {
          window.clearTimeout(linkClearTimerRef.current)
          linkClearTimerRef.current = null
        }
        cloud.classList.add("is-magnetic")
      } else {
        cloud.classList.remove("is-magnetic")
        clearLinksAfterFade()
      }
    } else {
      cloud.classList.remove("is-magnetic")
      clearLinksAfterFade()
    }
  }

  const startPhysics = () => {
    if (frameRef.current !== null) return
    const step = () => {
      const field = fieldRef.current
      const nodes = nodesRef.current
      if (!field || nodes.length === 0) {
        frameRef.current = null
        return
      }
      const width = field.clientWidth
      const height = field.clientHeight
      const drag = dragRef.current
      const now = performance.now()
      let maxSpeed = 0

      if (drag) {
        const dragged = nodes.find((node) => node.tag === drag.tag)
        if (dragged) {
          dragged.x = drag.targetX
          dragged.y = drag.targetY
          dragged.vx = 0
          dragged.vy = 0
        }
      }

      // Each chip pulls on every other chip; overlap repulsion keeps the cloud legible.
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]
          const b = nodes[j]
          const ax = a.x + a.width / 2
          const ay = a.y + a.height / 2
          const bx = b.x + b.width / 2
          const by = b.y + b.height / 2
          let dx = bx - ax
          let dy = by - ay
          let distance = Math.hypot(dx, dy)
          if (distance < 0.01) {
            dx = (i % 2 ? -1 : 1) * 0.1
            dy = (j % 2 ? -1 : 1) * 0.1
            distance = Math.hypot(dx, dy)
          }
          const directionX = dx / distance
          const directionY = dy / distance
          const minDistance =
            Math.abs(directionX) * (a.width + b.width) / 2 +
            Math.abs(directionY) * (a.height + b.height) / 2 + 20
          const overlapX = (a.width + b.width) / 2 + 16 - Math.abs(dx)
          const overlapY = (a.height + b.height) / 2 + 16 - Math.abs(dy)
          if (overlapX > 0 && overlapY > 0) {
            const useX = overlapX / (a.width + b.width) < overlapY / (a.height + b.height)
            const push = useX ? overlapX : overlapY
            const sign = useX ? Math.sign(dx || 1) : Math.sign(dy || 1)
            const aPinned = a.tag === drag?.tag
            const bPinned = b.tag === drag?.tag
            const shareA = aPinned ? 0 : bPinned ? 1 : 0.5
            const shareB = bPinned ? 0 : aPinned ? 1 : 0.5
            if (useX) {
              a.x -= sign * push * shareA
              b.x += sign * push * shareB
              if (a.vx * sign > 0) a.vx *= 0.2
              if (b.vx * sign < 0) b.vx *= 0.2
            } else {
              a.y -= sign * push * shareA
              b.y += sign * push * shareB
              if (a.vy * sign > 0) a.vy *= 0.2
              if (b.vy * sign < 0) b.vy *= 0.2
            }
          } else if (distance > minDistance) {
            const draggedPair = a.tag === drag?.tag || b.tag === drag?.tag
            const pull = Math.min(
              (distance - minDistance) * (draggedPair ? 0.00135 : 0.00045),
              draggedPair ? 0.16 : 0.07,
            )
            const fx = (dx / distance) * pull
            const fy = (dy / distance) * pull
            if (a.tag !== drag?.tag) { a.vx += fx; a.vy += fy }
            if (b.tag !== drag?.tag) { b.vx -= fx; b.vy -= fy }
          } else {
            const push = Math.min((minDistance - distance) * 0.0005, 0.06)
            const fx = (dx / distance) * push
            const fy = (dy / distance) * push
            if (a.tag !== drag?.tag) { a.vx -= fx; a.vy -= fy }
            if (b.tag !== drag?.tag) { b.vx += fx; b.vy += fy }
          }
        }
      }

      if (!drag) {
        const centerX = width / 2
        const centerY = height / 2
        nodes.forEach((node) => {
          node.vx += (centerX - node.width / 2 - node.x) * 0.00035
          node.vy += (centerY - node.height / 2 - node.y) * 0.00035
        })
      }

      nodes.forEach((node) => {
        if (node.tag !== drag?.tag) {
          node.vx *= 0.88
          node.vy *= 0.88
          const speed = Math.hypot(node.vx, node.vy)
          if (speed > 2.4) {
            node.vx = (node.vx / speed) * 2.4
            node.vy = (node.vy / speed) * 2.4
          }
          node.x += node.vx
          node.y += node.vy
        }
        if (node.x < 0) { node.x = 0; node.vx = Math.abs(node.vx) * 0.18 }
        if (node.y < 0) { node.y = 0; node.vy = Math.abs(node.vy) * 0.18 }
        if (node.x + node.width > width) { node.x = width - node.width; node.vx = -Math.abs(node.vx) * 0.18 }
        if (node.y + node.height > height) { node.y = height - node.height; node.vy = -Math.abs(node.vy) * 0.18 }
      })

      // Resolve any last-frame collisions before painting so no two pills render on top of each other.
      for (let pass = 0; pass < 12; pass += 1) {
        for (let i = 0; i < nodes.length; i += 1) {
          for (let j = i + 1; j < nodes.length; j += 1) {
            const a = nodes[i]
            const b = nodes[j]
            const dx = b.x + b.width / 2 - a.x - a.width / 2
            const dy = b.y + b.height / 2 - a.y - a.height / 2
            const overlapX = (a.width + b.width) / 2 + 16 - Math.abs(dx)
            const overlapY = (a.height + b.height) / 2 + 16 - Math.abs(dy)
            if (overlapX <= 0 || overlapY <= 0) continue
            let useX = overlapX / (a.width + b.width) < overlapY / (a.height + b.height)
            const aPinned = a.tag === drag?.tag
            const bPinned = b.tag === drag?.tag
            if (aPinned !== bPinned) {
              const moving = aPinned ? b : a
              const signX = Math.sign(dx || 1) * (aPinned ? 1 : -1)
              const signY = Math.sign(dy || 1) * (aPinned ? 1 : -1)
              const roomX = signX < 0 ? moving.x : width - moving.width - moving.x
              const roomY = signY < 0 ? moving.y : height - moving.height - moving.y
              if (useX && roomX + 0.5 < overlapX && roomY + 0.5 >= overlapY) useX = false
              else if (!useX && roomY + 0.5 < overlapY && roomX + 0.5 >= overlapX) useX = true
            }
            const push = (useX ? overlapX : overlapY) + 0.5
            const sign = useX ? Math.sign(dx || 1) : Math.sign(dy || 1)
            const shareA = aPinned ? 0 : bPinned ? 1 : 0.5
            const shareB = bPinned ? 0 : aPinned ? 1 : 0.5
            if (useX) {
              a.x -= sign * push * shareA
              b.x += sign * push * shareB
              if (a.vx * sign > 0) a.vx *= 0.2
              if (b.vx * sign < 0) b.vx *= 0.2
            } else {
              a.y -= sign * push * shareA
              b.y += sign * push * shareB
              if (a.vy * sign > 0) a.vy *= 0.2
              if (b.vy * sign < 0) b.vy *= 0.2
            }
            a.x = Math.max(0, Math.min(width - a.width, a.x))
            a.y = Math.max(0, Math.min(height - a.height, a.y))
            b.x = Math.max(0, Math.min(width - b.width, b.x))
            b.y = Math.max(0, Math.min(height - b.height, b.y))
          }
        }
      }

      nodes.forEach((node) => {
        node.element.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) rotate(${node.angle}deg)`
        maxSpeed = Math.max(maxSpeed, Math.hypot(node.vx, node.vy))
      })

      paintLinks()
      if (drag || now < settleUntilRef.current || maxSpeed > 0.025) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        frameRef.current = null
      }
    }
    frameRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    const cloud = cloudRef.current
    const field = fieldRef.current
    if (!cloud || !field) return
    const initialize = () => {
      const width = field.clientWidth
      if (!width) return
      cloud.style.removeProperty("min-height")
      const baseMinHeight = Number.parseFloat(window.getComputedStyle(cloud).minHeight) || cloud.offsetHeight
      const verticalChrome = cloud.offsetHeight - field.clientHeight
      const elements = Array.from(field.querySelectorAll<HTMLSpanElement>(".principles-tag"))
      const nodes: TagNode[] = elements.map((element, index) => ({
        tag: element.dataset.tag ?? String(index),
        element,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        width: element.offsetWidth,
        height: element.offsetHeight,
        angle: ((index * 7) % 5 - 2) * 0.7,
      }))
      const gapX = 10
      const gapY = 6
      const rows: Array<{ nodes: TagNode[]; width: number; height: number }> = []
      nodes.forEach((node) => {
        let row = rows[rows.length - 1]
        if (!row || (row.nodes.length > 0 && (row.nodes.length >= 3 || row.width + gapX + node.width > width))) {
          row = { nodes: [], width: 0, height: 0 }
          rows.push(row)
        }
        if (row.nodes.length > 0) row.width += gapX
        row.nodes.push(node)
        row.width += node.width
        row.height = Math.max(row.height, node.height)
      })
      const packedHeight = rows.reduce((sum, row) => sum + row.height, 0) + Math.max(0, rows.length - 1) * gapY
      const baseFieldHeight = Math.max(0, baseMinHeight - verticalChrome)
      const requiredHeight = baseMinHeight + Math.max(0, packedHeight - baseFieldHeight)
      if (requiredHeight > baseMinHeight) cloud.style.minHeight = `${requiredHeight}px`
      let y = Math.max(0, (field.clientHeight - packedHeight) / 2)
      rows.forEach((row, rowIndex) => {
        let x = Math.max(0, (width - row.width) / 2)
        row.nodes.forEach((node, itemIndex) => {
          node.x = x
          node.y = y + Math.sin((rowIndex + itemIndex) * 2.1) * 3
          x += node.width + gapX
        })
        y += row.height + gapY
      })
      nodesRef.current = nodes
      nodes.forEach((node) => {
        node.element.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) rotate(${node.angle}deg)`
      })
      settleUntilRef.current = performance.now() + 800
      startPhysics()
    }
    initialize()
    const observer = new ResizeObserver(initialize)
    observer.observe(field)
    field.querySelectorAll<HTMLElement>(".principles-tag").forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      if (linkClearTimerRef.current !== null) window.clearTimeout(linkClearTimerRef.current)
      frameRef.current = null
      linkClearTimerRef.current = null
      nodesRef.current = []
    }
  }, [tags])

  const beginTagDrag = (event: ReactPointerEvent<HTMLSpanElement>, tag: string) => {
    if (event.button !== 0) return
    event.preventDefault()
    const field = fieldRef.current
    const node = nodesRef.current.find((item) => item.tag === tag)
    if (!field || !node) return
    const rect = field.getBoundingClientRect()
    dragRef.current = {
      tag,
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left - node.x,
      offsetY: event.clientY - rect.top - node.y,
      targetX: node.x,
      targetY: node.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.classList.add("is-dragging")
    settleUntilRef.current = Number.POSITIVE_INFINITY
    startPhysics()
  }

  const moveDraggedTag = (event: ReactPointerEvent<HTMLSpanElement>) => {
    const cloud = cloudRef.current
    if (cloud) {
      pointerRef.current = { x: event.clientX, y: event.clientY }
      paintLinks()
    }
    const drag = dragRef.current
    const field = fieldRef.current
    if (!drag || drag.pointerId !== event.pointerId || !field) return
    const rect = field.getBoundingClientRect()
    drag.targetX = Math.max(0, Math.min(field.clientWidth - event.currentTarget.offsetWidth, event.clientX - rect.left - drag.offsetX))
    drag.targetY = Math.max(0, Math.min(field.clientHeight - event.currentTarget.offsetHeight, event.clientY - rect.top - drag.offsetY))
    startPhysics()
  }

  const finishTagDrag = (event: ReactPointerEvent<HTMLSpanElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    event.currentTarget.classList.remove("is-dragging")
    dragRef.current = null
    settleUntilRef.current = performance.now() + 1400
    startPhysics()
  }

  return (
    <div
      className="principles-cloud"
      ref={cloudRef}
      aria-label="Интерактивное облако тегов: соседние теги притягиваются друг к другу"
      onPointerMove={(event) => {
        if (dragRef.current) return
        pointerRef.current = { x: event.clientX, y: event.clientY }
        paintLinks()
      }}
      onPointerLeave={(event) => {
        pointerRef.current = { x: event.clientX, y: event.clientY }
        paintLinks(true)
        pointerRef.current = null
      }}
    >
      <svg className="principles-magnetic-links" aria-hidden="true">
        <path ref={linksRef} />
      </svg>
      <span className="principles-cursor-dot" aria-hidden="true" />
      <div className="principles-tags" ref={fieldRef} role="list">
        {tags.map((tag, index) => (
          <span
            className="principles-tag"
            data-tag={tag}
            key={tag}
            role="listitem"
            tabIndex={0}
            style={{ "--tag-index": index } as CSSProperties}
            onPointerDown={(event) => beginTagDrag(event, tag)}
            onPointerMove={moveDraggedTag}
            onPointerUp={finishTagDrag}
            onPointerCancel={finishTagDrag}
            onLostPointerCapture={finishTagDrag}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function PrinciplesSection() {
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isLeaving, setIsLeaving] = useState(false)
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const displayedPrinciple = principles[displayIndex]

  useEffect(() => () => {
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current)
  }, [])

  const selectPrinciple = (direction: -1 | 1) => {
    if (isLeaving) return
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current)
    setIsLeaving(true)
    transitionTimerRef.current = window.setTimeout(() => {
      setDisplayIndex((current) => (current + direction + principles.length) % principles.length)
      setIsLeaving(false)
      transitionTimerRef.current = null
    }, 180)
  }

  return (
    <section className="principles-section content" id="principles" aria-label="Принципы работы">
      <div className="principles-panel" aria-label="Принципы работы">
        <div className="principles-layout">
          <div className="principles-copy-column">
            <h2 className="principles-heading">Принципы</h2>
            <div
              role="group"
              aria-label="Выбрать принцип"
              className="principles-switcher"
              onKeyDown={(event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
                event.preventDefault()
                selectPrinciple(event.key === "ArrowRight" ? 1 : -1)
              }}
            >
              <button
                className="principles-switcher-arrow"
                type="button"
                aria-label="Предыдущий принцип"
                onClick={() => selectPrinciple(-1)}
                disabled={isLeaving}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5-7 7 7 7" /></svg>
              </button>
              <div className={`principles-switcher-title${isLeaving ? " is-leaving" : ""}`} aria-live="polite">
                <span key={displayedPrinciple.id}>{displayedPrinciple.label}</span>
              </div>
              <button
                className="principles-switcher-arrow"
                type="button"
                aria-label="Следующий принцип"
                onClick={() => selectPrinciple(1)}
                disabled={isLeaving}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 5 7 7-7 7" /></svg>
              </button>
            </div>

            <div
              className={`principles-slide${isLeaving ? " is-leaving" : ""}`}
              key={displayedPrinciple.id}
              id="principle-slide"
              aria-busy={isLeaving}
            >
              <h3><AnimatedPrincipleText text={displayedPrinciple.title} /></h3>
              <p>
                <AnimatedPrincipleText
                  text={displayedPrinciple.description}
                  wordOffset={displayedPrinciple.title.trim().split(/\s+/u).length}
                />
              </p>
            </div>
          </div>

          <div className={`principles-cloud-transition${isLeaving ? " is-leaving" : ""}`} key={displayedPrinciple.id}>
            <PrincipleCloud tags={displayedPrinciple.tags} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  featured: isFeatured = false,
  onOpen,
}: {
  project: Project
  featured?: boolean
  onOpen: (project: Project) => void
}) {
  return (
    <button
      className={`project-card project-card--interactive ${isFeatured ? "project-card--featured" : ""}`}
      onClick={() => onOpen(project)}
      type="button"
      aria-label={`Открыть проект ${project.title}`}
    >
      <span
        className="project-image"
        onPointerMove={(event) => {
          if (event.pointerType === "touch") return
          const rect = event.currentTarget.getBoundingClientRect()
          const x = (event.clientX - rect.left) / rect.width - 0.5
          const y = (event.clientY - rect.top) / rect.height - 0.5
          const tiltX = y * 6
          const tiltY = x * -8
          event.currentTarget.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`)
          event.currentTarget.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`)
          event.currentTarget.style.setProperty("--card-x", `${(x * 8).toFixed(1)}px`)
          event.currentTarget.style.setProperty("--card-y", `${(y * 6).toFixed(1)}px`)
          const reflectionX = tiltY * 14
          const reflectionY = tiltX * -12
          const badgeGlintX = tiltY * 3.5
          const badgeGlintY = tiltX * 3.5
          event.currentTarget.style.setProperty("--reflection-x", `${reflectionX.toFixed(1)}px`)
          event.currentTarget.style.setProperty("--reflection-y", `${reflectionY.toFixed(1)}px`)
          event.currentTarget.parentElement?.style.setProperty("--badge-glint-x", `${badgeGlintX.toFixed(1)}px`)
          event.currentTarget.parentElement?.style.setProperty("--badge-glint-y", `${badgeGlintY.toFixed(1)}px`)
          event.currentTarget.style.setProperty("--reflection-secondary-x", `${(-reflectionX * 1.25 - 62).toFixed(1)}px`)
          event.currentTarget.style.setProperty("--reflection-secondary-y", `${(-reflectionY * 1.15 + 60).toFixed(1)}px`)
          event.currentTarget.style.setProperty("--reflection-cross-x", `${(reflectionX * -1.6 + 18).toFixed(1)}px`)
          event.currentTarget.style.setProperty("--reflection-cross-y", `${(reflectionY * -1.5 - 18).toFixed(1)}px`)
          event.currentTarget.style.setProperty("--shadow-x", `${(-tiltY * 1.2).toFixed(1)}px`)
          event.currentTarget.style.setProperty("--shadow-y", `${(14 + tiltX * 0.8).toFixed(1)}px`)
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty("--tilt-x", "0deg")
          event.currentTarget.style.setProperty("--tilt-y", "0deg")
          event.currentTarget.style.setProperty("--card-x", "0px")
          event.currentTarget.style.setProperty("--card-y", "0px")
          event.currentTarget.style.setProperty("--reflection-x", "0px")
          event.currentTarget.style.setProperty("--reflection-y", "0px")
          event.currentTarget.parentElement?.style.setProperty("--badge-glint-x", "0px")
          event.currentTarget.parentElement?.style.setProperty("--badge-glint-y", "0px")
          event.currentTarget.style.setProperty("--reflection-secondary-x", "-62px")
          event.currentTarget.style.setProperty("--reflection-secondary-y", "60px")
          event.currentTarget.style.setProperty("--reflection-cross-x", "18px")
          event.currentTarget.style.setProperty("--reflection-cross-y", "-18px")
          event.currentTarget.style.setProperty("--shadow-x", "0px")
          event.currentTarget.style.setProperty("--shadow-y", "14px")
        }}
      >
        <img src={asset(project.image)} alt="" />
        <span className="project-holographic-sheen" aria-hidden="true" />
        <span className="project-holographic-sheen project-holographic-sheen--secondary" aria-hidden="true" />
        <span className="project-holographic-sheen project-holographic-sheen--cross" aria-hidden="true" />
        <span className="project-overlay" aria-hidden="true">
          <span>Посмотреть проект</span>
        </span>
      </span>
      <span className="project-copy">
        <span className="project-logo" aria-hidden="true">
          <img src={asset(project.logo)} alt="" />
        </span>
        <span className="project-meta">
          <span className="project-title-row">
            <strong>{project.title}</strong>
            {isFeatured && (
              <span className="project-badge" aria-hidden="true" />
            )}
          </span>
          <small>{project.subtitle}</small>
        </span>
      </span>
    </button>
  )
}

function ExpandableExperienceText({ description }: { description: string }) {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonSwapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasInteractedRef = useRef(false)
  const [expanded, setExpanded] = useState(false)
  const [buttonExpanded, setButtonExpanded] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [visibleWordCount, setVisibleWordCount] = useState(0)
  const [isCollapsingWords, setIsCollapsingWords] = useState(false)
  const wordCount = description.split(/\s+/).filter(Boolean).length

  useEffect(() => () => {
    if (buttonSwapTimerRef.current !== null) window.clearTimeout(buttonSwapTimerRef.current)
  }, [])

  useEffect(() => {
    const paragraph = paragraphRef.current
    if (!paragraph || expanded) return

    const measureOverflow = () => {
      const overflowed = paragraph.scrollHeight > paragraph.clientHeight + 1
      if (!hasInteractedRef.current) {
        setHasMore((current) => current === overflowed ? current : overflowed)
      }

      const paragraphTop = paragraph.getBoundingClientRect().top
      const lineHeight = Number.parseFloat(window.getComputedStyle(paragraph).lineHeight) || 25
      const words = Array.from(paragraph.querySelectorAll<HTMLElement>(".experience-description-word"))
      const firstHiddenWord = words.findIndex((word) => {
        const rect = word.getBoundingClientRect()
        return rect.height === 0 || rect.top >= paragraphTop + lineHeight * 2 - 1
      })
      const visibleCount = firstHiddenWord === -1 ? words.length : firstHiddenWord
      setVisibleWordCount((current) => current === visibleCount ? current : visibleCount)
    }

    measureOverflow()
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measureOverflow)
    observer?.observe(paragraph)
    window.addEventListener("resize", measureOverflow)

    return () => {
      observer?.disconnect()
      window.removeEventListener("resize", measureOverflow)
    }
  }, [description, expanded])

  const animateLayout = (nextExpanded: boolean) => {
    const content = contentRef.current
    if (!content) {
      setExpanded(nextExpanded)
      setButtonExpanded(nextExpanded)
      return
    }

    const button = content.querySelector<HTMLButtonElement>(".experience-description-toggle")
    const buttonStart = button?.getBoundingClientRect()
    content.style.height = `${content.getBoundingClientRect().height}px`
    setExpanded(nextExpanded)
    setButtonExpanded(nextExpanded)
    requestAnimationFrame(() => {
      const currentButton = content.querySelector<HTMLButtonElement>(".experience-description-toggle")
      if (buttonStart && currentButton) {
        const buttonNow = currentButton.getBoundingClientRect()
        currentButton.style.transition = "none"
        currentButton.style.transform = `translate3d(${(buttonStart.left - buttonNow.left).toFixed(2)}px, ${(buttonStart.top - buttonNow.top).toFixed(2)}px, 0)`
        void currentButton.offsetWidth
      }

      requestAnimationFrame(() => {
        if (nextExpanded) {
          content.style.height = `${content.scrollHeight}px`
        } else {
          const paragraph = paragraphRef.current
          const toggle = content.querySelector("button")
          if (paragraph && toggle) {
            const paragraphStyle = window.getComputedStyle(paragraph)
            const buttonStyle = window.getComputedStyle(toggle)
            const collapsedHeight =
              paragraph.getBoundingClientRect().height +
              Number.parseFloat(paragraphStyle.marginTop) +
              Number.parseFloat(buttonStyle.marginTop) +
              toggle.getBoundingClientRect().height
            content.style.height = `${collapsedHeight}px`
          }
        }

        if (currentButton) {
          currentButton.style.transition = ""
          currentButton.style.transform = "translate3d(0, 0, 0)"
        }
      })
    })
  }

  const toggleExpanded = () => {
    if (isCollapsingWords) return
    hasInteractedRef.current = true

    if (!expanded) {
      animateLayout(true)
      return
    }

    const content = contentRef.current
    const paragraph = paragraphRef.current
    const button = content?.querySelector<HTMLButtonElement>(".experience-description-toggle")
    if (!content || !paragraph || !button) {
      setExpanded(false)
      setButtonExpanded(false)
      setIsCollapsingWords(false)
      return
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setExpanded(false)
      setButtonExpanded(false)
      setIsCollapsingWords(false)
      content.style.height = "auto"
      return
    }

    const paragraphStyle = window.getComputedStyle(paragraph)
    const buttonStyle = window.getComputedStyle(button)
    const paragraphRect = paragraph.getBoundingClientRect()
    const buttonRect = button.getBoundingClientRect()
    const lineHeight = Number.parseFloat(paragraphStyle.lineHeight) || 25
    const buttonMargin = Number.parseFloat(buttonStyle.marginTop) || 0
    const collapsedHeight =
      Number.parseFloat(paragraphStyle.marginTop) +
      lineHeight * 2 +
      buttonMargin +
      buttonRect.height
    const collapsedButtonTop = paragraphRect.top + lineHeight * 2 + buttonMargin

    content.style.height = `${content.getBoundingClientRect().height}px`
    void content.offsetHeight
    content.style.transitionDelay = "330ms"
    content.style.height = `${collapsedHeight}px`

    button.style.transition = "none"
    button.style.transform = "translate3d(0, 0, 0)"
    void button.offsetWidth
    button.style.transition = ""
    button.style.transitionDelay = "330ms"
    button.style.transform = `translate3d(0, ${(collapsedButtonTop - buttonRect.top).toFixed(2)}px, 0)`
    setIsCollapsingWords(true)
    buttonSwapTimerRef.current = window.setTimeout(() => {
      buttonSwapTimerRef.current = null
      setButtonExpanded(false)
    }, 330)
  }

  let wordIndex = 0
  const descriptionWords = description.split(/(\s+)/).map((part, index) => {
    if (/^\s+$/.test(part)) return part
    const currentIndex = wordIndex
    const isExtraWord = currentIndex >= visibleWordCount
    const extraWordCount = Math.max(1, wordCount - visibleWordCount)
    const hideDelayStep = Math.min(18, 380 / Math.max(1, extraWordCount - 1))
    const delay = isCollapsingWords
      ? Math.max(0, wordCount - currentIndex - 1) * hideDelayStep
      : Math.max(0, currentIndex - visibleWordCount) * 18
    wordIndex += 1
    return (
      <span
        className={`experience-description-word${isExtraWord ? " is-extra" : ""}`}
        key={`${index}-${part}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {part}
      </span>
    )
  })

  return (
    <div
      className={`experience-copy-expand${expanded ? " is-expanded" : ""}${isCollapsingWords ? " is-collapsing-words" : ""}`}
      ref={contentRef}
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget && event.propertyName === "height") {
          const content = event.currentTarget
          if (expanded && isCollapsingWords) {
            const button = content.querySelector<HTMLButtonElement>(".experience-description-toggle")
            if (button) {
              button.style.transition = "none"
              button.style.transitionDelay = ""
            }
            content.style.transitionDelay = ""
            setExpanded(false)
            setButtonExpanded(false)
            setIsCollapsingWords(false)
            if (buttonSwapTimerRef.current !== null) {
              window.clearTimeout(buttonSwapTimerRef.current)
              buttonSwapTimerRef.current = null
            }
            requestAnimationFrame(() => {
              if (button) {
                button.style.transform = "translate3d(0, 0, 0)"
                void button.offsetWidth
                button.style.transition = ""
              }
            })
            return
          }

          content.style.height = "auto"
        }
      }}
    >
      <p ref={paragraphRef} className={expanded ? undefined : "is-collapsed"}>
        {descriptionWords}
      </p>
      {hasMore && (
        <button
          className={`experience-description-toggle${buttonExpanded ? " is-expanded" : ""}`}
          type="button"
          aria-expanded={buttonExpanded}
          aria-label={buttonExpanded ? "Свернуть описание" : "Показать больше"}
          onClick={toggleExpanded}
          onTransitionEnd={(event) => {
            if (event.target === event.currentTarget && event.propertyName === "transform" && !isCollapsingWords) {
              event.currentTarget.style.transform = "translate3d(0, 0, 0)"
            }
          }}
        >
          <svg className="experience-toggle-chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="m4 6 4 4 4-4" />
          </svg>
          <span className="experience-toggle-label experience-toggle-label--more" aria-hidden="true">
            Показать больше
          </span>
          <span className="experience-toggle-label experience-toggle-label--less" aria-hidden="true">
            Свернуть
          </span>
        </button>
      )}
    </div>
  )
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState<"all" | "featured" | "other">("all")

  const allProjects: Project[] = [
    ...featured.map((project) => ({ ...project, featured: true })),
    ...projects,
  ]
  const visibleProjects = allProjects.filter((project) =>
    projectFilter === "all" ||
    (projectFilter === "featured" && project.featured) ||
    (projectFilter === "other" && !project.featured),
  )

  useEffect(() => {
    if (!selectedProject) return
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null)
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [selectedProject])

  return (
    <main>
      <header className="floating-nav" aria-label="Основная навигация">
        <a className="nav-icon" href="#about" aria-label="Перейти к началу">
          <img src={asset("a26c2.png")} alt="" />
        </a>
        <a
          className="nav-icon nav-icon--desktop"
          href="#projects"
          aria-label="Проекты"
        >
          <img src={asset("19187.png")} alt="" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Открыть меню"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "nav-links nav-links--open" : "nav-links"}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="nav-icon nav-icon--desktop"
          href="mailto:hello@kharovskiy.design"
          aria-label="Написать письмо"
        >
          <img src={asset("521d9.png")} alt="" />
        </a>
        <a
          className="nav-icon nav-icon--desktop"
          href="#contacts"
          aria-label="Контакты"
        >
          <img src={asset("8a613.png")} alt="" />
        </a>
      </header>

      <section className="hero" id="about" aria-labelledby="hero-title">
        <div className="hero-frame">
          <video
            className="hero-background hero-background--video"
            src={asset("hero-motion-pingpong.mp4")}
            poster={asset("64303.png")}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <img className="hero-person" src={asset("ac275.png")} alt="" />
          <div className="hero-copy">
            <h1 id="hero-title">Игорь Харовский</h1>
            <p>Product designer</p>
          </div>
        </div>
      </section>

      <div className="statement">
        <p>
          <span>
            10 лет превращаю сложные бизнес–задачи в продукты, которыми хочется
            пользоваться
          </span>
        </p>
      </div>

      <section className="work" id="projects">
        <div className="content">
          <div className="catalog-head-row">
            <div className="catalog-heading">
              <h2>Все проекты</h2>
              <p>Ключевые продукты и цифровые сервисы, над которыми я работал</p>
            </div>
            <div className="project-segment" role="group" aria-label="Фильтр проектов">
              {[
                { id: "all", label: "Все" },
                { id: "featured", label: "Ключевые" },
                { id: "other", label: "Остальные" },
              ].map((filter) => (
                <button
                  className={projectFilter === filter.id ? "project-segment-item project-segment-item--active" : "project-segment-item"}
                  key={filter.id}
                  type="button"
                  aria-pressed={projectFilter === filter.id}
                  onClick={() => setProjectFilter(filter.id as "all" | "featured" | "other")}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="projects-grid">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                featured={project.featured}
                onOpen={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="experience content" id="experience" aria-labelledby="experience-title">
        <div className="experience-panel">
          <div className="experience-heading">
            <h2 id="experience-title">Опыт работы</h2>
          </div>
          <div className="experience-layout">
            <div className="experience-list">
              {experienceItems.map((item) => (
                <article className="experience-row" key={item.company}>
                <a
                  className="experience-company-link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.company}: ${item.companyDescription}. Открыть сайт компании`}
                  onPointerMove={(event) => {
                    if (event.pointerType === "touch") return
                    const rect = event.currentTarget.getBoundingClientRect()
                    const x = (event.clientX - rect.left - rect.width / 2) * 0.08
                    const y = (event.clientY - rect.top - rect.height / 2) * 0.08
                    event.currentTarget.style.setProperty("--pointer-x", `${x}px`)
                    event.currentTarget.style.setProperty("--pointer-y", `${y}px`)
                  }}
                  onPointerLeave={(event) => {
                    event.currentTarget.style.setProperty("--pointer-x", "0px")
                    event.currentTarget.style.setProperty("--pointer-y", "0px")
                  }}
                >
                  <span className={`experience-logo experience-logo--${item.logoTone}`} aria-hidden="true">
                    <span>{item.mark}</span>
                    <img
                      src={item.logo}
                      alt=""
                      onError={(event) => {
                        event.currentTarget.hidden = true
                      }}
                    />
                  </span>
                  <span className="experience-company-copy">
                    <span className="experience-company-name">
                      <strong>{item.company}</strong>
                      <span className="experience-company-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </span>
                    </span>
                    <span className="experience-company-description">{item.companyDescription}</span>
                    <time>{item.dates}</time>
                  </span>
                </a>
                <div className="experience-description">
                  <h4>{item.role}</h4>
                  <ExpandableExperienceText description={item.description} />
                </div>
                </article>
              ))}
            </div>
            <aside id="expertise" className="experience-focus-card" aria-label="Домены, индустрии, направления и модели взаимодействия">
              <div className="focus-card-topline">
                <h3>Домены</h3>
                <div className="focus-card-symbols" aria-hidden="true">
                  {(["✤", "✽", "❉"] as const).map((symbol) => (
                    <span
                      className="focus-card-symbol"
                      key={symbol}
                      onPointerEnter={(event) => {
                        if (event.pointerType === "touch") return
                        const element = event.currentTarget
                        if (element.classList.contains("is-spinning")) return
                        element.classList.add("is-spinning")
                      }}
                      onAnimationEnd={(event) => {
                        event.currentTarget.classList.remove("is-spinning")
                      }}
                    >
                      {symbol}
                    </span>
                  ))}
                </div>
              </div>
              <div className="focus-card-grid">
                <h4>Индустрии</h4>
                <div className="focus-card-values">
                  <span>Fintech</span><span>E-commerce</span><span>RetailTech</span>
                  <span>TelecomTech</span><span>FoodTech</span>
                </div>
                <h4>Направления</h4>
                <div className="focus-card-values">
                  <span>Highload</span><span>SaaS</span><span>On-prem</span>
                </div>
                <h4>Модели взаимодействия</h4>
                <div className="focus-card-values">
                  <span>B2B</span><span>B2C</span><span>B2E</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="awards content" id="awards" aria-labelledby="awards-title">
        <div className="awards-panel">
          <div className="awards-heading">
            <h2 id="awards-title">Достижения</h2>
          </div>
          <div className="awards-grid">
            {[
              { src: "awards/golden-site-awards-winner.svg", alt: "Golden Site Awards — победитель", id: "golden-site-awards-winner" },
              { src: "awards/awwwards-mobile-excellence.svg", alt: "Awwwards — Mobile Excellence", id: "awwwards-mobile-excellence" },
              { src: "awards/awwwards-honorable-mention.svg", alt: "Awwwards — Honorable Mention", id: "awwwards-honorable-mention" },
              { src: "awards/wadline-awards-winner.svg", alt: "Wadline Awards — победитель", id: "wadline-awards-winner" },
            ].map(({ src, alt, id }) => (
              <div
                className="award-item"
                key={src}
                data-award={id}
                onPointerMove={(event) => {
                  if (event.pointerType === "touch") return
                  const rect = event.currentTarget.getBoundingClientRect()
                  const x = (event.clientX - rect.left) / rect.width - 0.5
                  const y = (event.clientY - rect.top) / rect.height - 0.5
                  event.currentTarget.style.setProperty("--award-x", `${(x * 4).toFixed(1)}px`)
                  event.currentTarget.style.setProperty("--award-y", `${(y * 3).toFixed(1)}px`)
                  event.currentTarget.style.setProperty("--award-rx", `${(y * 6).toFixed(2)}deg`)
                  event.currentTarget.style.setProperty("--award-ry", `${(x * -8).toFixed(2)}deg`)
                  event.currentTarget.style.setProperty("--award-shine-position", `${((0.5 - x) * 100).toFixed(0)}%`)
                }}
                onPointerLeave={(event) => {
                  event.currentTarget.style.setProperty("--award-x", "0px")
                  event.currentTarget.style.setProperty("--award-y", "0px")
                  event.currentTarget.style.setProperty("--award-rx", "0deg")
                  event.currentTarget.style.setProperty("--award-ry", "0deg")
                  event.currentTarget.style.setProperty("--award-shine-position", "50%")
                }}
              >
                <img src={asset(src)} alt={alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PrinciplesSection />

      <footer id="contacts">
          <p>Игорь Харовский · Product designer</p>
        <a href="mailto:hello@kharovskiy.design">Связаться</a>
      </footer>

      {selectedProject && (
        <div
          className="project-dialog"
          role="dialog"
          aria-modal="true"
          aria-label={`Проект ${selectedProject.title}`}
        >
          <button
            className="dialog-backdrop"
            type="button"
            aria-label="Закрыть"
            onClick={() => setSelectedProject(null)}
          />
          <article>
            <button
              className="dialog-close"
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Закрыть"
            >
              ×
            </button>
            <img src={asset(selectedProject.image)} alt="" />
            <div>
              <p>{selectedProject.subtitle}</p>
              <h2>{selectedProject.title}</h2>
              <button type="button" onClick={() => setSelectedProject(null)}>
                Вернуться к проектам
              </button>
            </div>
          </article>
        </div>
      )}
    </main>
  )
}
