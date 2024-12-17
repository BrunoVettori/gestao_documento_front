/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
    	extend: {
    		fontFamily: {
    			nunito: ['Nunito'],
    			nunito_bold: ['Nunito Bold'],
    			nunito_light: ['Nunito Light'],
    			nunito_semibold: ['Nunito SemiBold']
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			system_card_background: 'white',
    			system_border: '#e7ebed',
    			system_background: '#ECEAF9',
    			system_orange_50: '#FFF8F1',
    			system_orange_100: '#FEECDC',
    			system_orange_200: '#FCD9BD',
    			system_orange_300: '#FDBA8C',
    			system_orange_400: '#FF8A4C',
    			system_orange_500: '#FF5A1F',
    			system_orange_600: '#D03801',
    			system_orange_700: '#B43403',
    			system_orange_800: '#8A2C0D',
    			system_orange_900: '#771D1D',
    			system_gray_50: '#F9FAFB',
    			system_gray_100: '#F3F4F6',
    			system_gray_200: '#E5E7EB',
    			system_gray_300: '#D1D5DB',
    			system_gray_400: '#9CA3AF',
    			system_gray_500: '#6B7280',
    			system_gray_600: '#4B5563',
    			system_gray_700: '#374151',
    			system_gray_800: '#1F2A37',
    			system_gray_900: '#111928',
    			system_red_50: '#FDF2F2',
    			system_red_100: '#FDE8E8',
    			system_red_200: '#FBD5D5',
    			system_red_300: '#F8B4B4',
    			system_red_400: '#F98080',
    			system_red_500: '#F05252',
    			system_red_600: '#E02424',
    			system_red_700: '#C81E1E',
    			system_red_800: '#9B1C1C',
    			system_red_900: '#771D1D',
    			system_teal_50: '#EDFAFA',
    			system_teal_100: '#D5F5F6',
    			system_teal_200: '#AFECEF',
    			system_teal_300: '#7EDCE2',
    			system_teal_400: '#16BDCA',
    			system_teal_500: '#0694A2',
    			system_teal_600: '#047481',
    			system_teal_700: '#036672',
    			system_teal_800: '#05505C',
    			system_teal_900: '#014451',
    			system_green_50: '#F3FAF7',
    			system_green_100: '#DEF7EC',
    			system_green_200: '#BCF0DA',
    			system_green_300: '#84E1BC',
    			system_green_400: '#31C48D',
    			system_green_500: '#0E9F6E ',
    			system_green_600: '#057A55',
    			system_green_700: '#046C4E',
    			system_green_800: '#03543F',
    			system_green_900: '#014737',
    			system_aqua_50: '#E3F3F0',
    			system_aqua_100: '#C6E6E2',
    			system_aqua_200: '#AADAD4',
    			system_aqua_300: '#8ECDC6',
    			system_aqua_400: '#71C1B7',
    			system_aqua_500: '#55B4A9',
    			system_aqua_600: '#449C92',
    			system_aqua_700: '#388077',
    			system_aqua_800: '#2C635D',
    			system_aqua_900: '#204642',
    			system_prince_50: '#D8D6EA',
    			system_prince_100: '#BDBBDD',
    			system_prince_200: '#A2A0CF',
    			system_prince_300: '#8785C1',
    			system_prince_400: '#6D6AB4',
    			system_prince_500: '#5652A3',
    			system_prince_600: '#474488',
    			system_prince_700: '#39376C',
    			system_prince_800: '#2B2A52',
    			system_prince_900: '#1D1C36',
    			system_yellow_50: '#FFF6C2',
    			system_yellow_100: '#FFF099',
    			system_yellow_200: '#FFEA70',
    			system_yellow_300: '#FFE347',
    			system_yellow_400: '#FFDE21',
    			system_yellow_500: '#F5D000',
    			system_yellow_600: '#CCAD00',
    			system_yellow_700: '#A38B00',
    			system_yellow_800: '#7A6800',
    			system_yellow_900: '#524500',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
    plugins: [require('tailwindcss-animate')],
};
