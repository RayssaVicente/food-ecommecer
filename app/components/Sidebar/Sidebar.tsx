"use client"
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import * as S from './style';

import MenuIcon from '../../../public/icons/menu.png';
import BurgerIcon from '../../../public/icons/bugger.png';
import PizzaIcon from '../../../public/icons/Pizza.png';
import SodaIcon from '../../../public/icons/soda.png';
import IcecreenIcon from '../../../public/icons/icecreen.png';

// DEFINA A INTERFACE PARA SUMIR O ERRO NO PAGE.TSX
interface SidebarProps {
  activeCategory?: string; // O '?' torna opcional para não quebrar outras páginas
  onCategoryChange?: (category: string) => void;
}

export function Sidebar({ activeCategory }: SidebarProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleToggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <S.Container isMenuOpen={menuOpen}>
            <button className='botao-menu' onClick={handleToggleMenu}>
                <Image src={MenuIcon} alt="Menu" />
            </button>

            <nav>
                <ul>
                    <li>
                        {/* Mantemos o Link para o design e SEO, mas a classe 'active' 
                            agora olha para o pathname ou para a prop activeCategory */}
                        <Link href="/" className={pathname === '/' || activeCategory === 'burgers' ? 'active' : ''}>
                            <Image src={BurgerIcon} alt="Hambúrguer" />
                            <span>Hambúrgueres</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/pizzas" className={pathname === '/pizzas' || activeCategory === 'pizzas' ? 'active' : ''}>
                            <Image src={PizzaIcon} alt="Pizza" />
                            <span>Pizzas</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/refrigerantes" className={pathname === '/refrigerantes' || activeCategory === 'drinks' ? 'active' : ''}>
                            <Image src={SodaIcon} alt="Refrigerante" />
                            <span>Refrigerantes</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/sorvetes" className={pathname === '/sorvetes' || activeCategory === 'icecreams' ? 'active' : ''}>
                            <Image src={IcecreenIcon} alt="Sorvete" />
                            <span>Sorvetes</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </S.Container>
    )
}