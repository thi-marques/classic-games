import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from 'src/app/page'

test('home', () => {
	render(<Home />)
	const heading = screen.getByRole('heading', { level: 1, name: /Home/i })

	expect(heading).toBeDefined()
})
