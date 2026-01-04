import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'content', 'modules');

export interface ModuleFrontmatter {
  title: string;
  description: string;
  order: number;
}

export interface Module {
  slug: string;
  frontmatter: ModuleFrontmatter;
  content: string;
}

export async function getAllModules(): Promise<Module[]> {
  try {
    const files = fs.readdirSync(CONTENT_PATH);
    const modules = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const slug = file.replace('.mdx', '');
        const filePath = path.join(CONTENT_PATH, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        return {
          slug,
          frontmatter: data as ModuleFrontmatter,
          content,
        };
      })
      .sort((a, b) => a.frontmatter.order - b.frontmatter.order);

    return modules;
  } catch (error) {
    console.error('Error reading modules:', error);
    return [];
  }
}

export async function getModuleBySlug(slug: string): Promise<Module | null> {
  try {
    const filePath = path.join(CONTENT_PATH, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      frontmatter: data as ModuleFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading module ${slug}:`, error);
    return null;
  }
}

export async function getAdjacentModules(currentSlug: string): Promise<{
  prev: Module | null;
  next: Module | null;
}> {
  const modules = await getAllModules();
  const currentIndex = modules.findIndex(module => module.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? modules[currentIndex - 1] : null,
    next: currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null,
  };
}