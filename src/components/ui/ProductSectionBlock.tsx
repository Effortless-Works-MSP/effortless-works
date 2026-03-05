import ProductCard from '@/components/ui/ProductCard'
import type { ProductSection } from '@/types'

interface ProductSectionBlockProps {
  section: ProductSection
  index: number
}

export default function ProductSectionBlock({ section, index }: ProductSectionBlockProps) {
  return (
    <div style={{
      paddingTop: 72,
      paddingBottom: 72,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Section header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 13, color: 'rgba(232,228,220,0.2)',
            fontWeight: 300,
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 300, fontSize: 'clamp(28px, 3vw, 40px)',
          color: '#E8E4DC', marginBottom: 10, lineHeight: 1.2,
        }}>
          {section.title}
        </h2>
        <p style={{
          fontSize: 14, color: 'rgba(232,228,220,0.5)',
          lineHeight: 1.8, maxWidth: 520,
        }}>
          {section.description}
        </p>
      </div>

      {/* Product cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(280px, 1fr))`,
        gap: 20,
      }}>
        {section.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
