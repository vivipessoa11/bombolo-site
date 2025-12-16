
import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

async function optimizeImages() {
    const pattern = 'src/assets/**/*.{jpg,jpeg,png,JPG}';
    const files = await glob(pattern);

    console.log(`Found ${files.length} images to optimize.`);

    let savedBytes = 0;

    for (const file of files) {
        const ext = path.extname(file);
        const newFile = file.replace(ext, '.webp');

        // Skip if it's already optimized (though pattern excludes webp, this is just sanity)
        if (file.endsWith('.webp')) continue;

        try {
            const stats = fs.statSync(file);
            const originalSize = stats.size;

            await sharp(file)
                .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(newFile);

            const newStats = fs.statSync(newFile);
            const newSize = newStats.size;

            savedBytes += (originalSize - newSize);

            console.log(`✅ Optimized: ${path.basename(file)} -> ${path.basename(newFile)} (${Math.round(originalSize / 1024)}KB -> ${Math.round(newSize / 1024)}KB)`);

            // Optional: Delete original if successful? 
            // For safety, let's just log it. The user task implies replacing content. 
            // I will allow the agent to delete them in a separate step or move them.

        } catch (err) {
            console.error(`❌ Error optimizing ${file}:`, err);
        }
    }

    console.log(`🎉 Optimization complete! Saved ${(savedBytes / 1024 / 1024).toFixed(2)} MB.`);
}

optimizeImages();
